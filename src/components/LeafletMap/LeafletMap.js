import React, { Component } from 'react';
import { Map, Pane as LeafletPane, TileLayer} from 'react-leaflet'
import LeafletMarkers from '../LeafletMarkers/LeafletMarkers';
import LeafletRasterLayers  from '../LeafletRasterLayers/LeafletRasterLayers';
import LeafletGeoJSONLayers from '../LeafletGeoJSONLayers/LeafletGeoJSONLayers';
import LeafletVectorLayers from '../LeafletVectorLayers/LeafletVectorLayers';
import './LeafletMap.css';
import addIcon from './add_icon.png';
import locationIcon from './my_location.png';

class LeafletMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      crosshairCoords: [0, 0],
    };

    this.mapRef = React.createRef();
    this.getTileUrl = this.getTileUrl.bind(this);
    this.getCenterTileKey = this.getCenterTileKey.bind(this);
    this.toRad = this.toRad.bind(this);
  }

  getTileUrl() {
    let tileUrl = '';
    let baseUrl = this.props.rasterLayerData[0].url;
    if (baseUrl !== '' && this.mapRef.current.leafletElement) {
      // Get leafletElement ref and extract layer data
      let leafletElement = this.mapRef.current.leafletElement;
      let layers = leafletElement['_layers'];
      let layerKeys = Object.keys(layers);

      // Find the layer with the WMS url
      let wmsLayer = {};

      for (let i = 0; i < layerKeys.length; i++) {
        let layer = layers[layerKeys[i]];
        if (layer['_url'] === baseUrl) {
          wmsLayer = layer;
        }
      }

      // Extract tile data and find approximate center
      let tiles = wmsLayer['_tiles'];
      if (tiles) {
        let tileKeys = Object.keys(tiles).sort();
        let centerTileKey = this.getCenterTileKey();
        let centerTile = tiles[centerTileKey];

        // Get tile url
        tileUrl = centerTile.el.getAttribute('src');
      }
    }

    return tileUrl;
  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  getCenterTileKey() {
    let viewport = this.mapRef.current.viewport;
    let center = viewport.center;
    let zoom = viewport.zoom;

    var xtile = parseInt(Math.floor( (center[1] + 180) / 360 * (1<<zoom) ));
    var ytile = parseInt(Math.floor( (1 - Math.log(Math.tan(this.toRad(center[0])) + 1 / Math.cos(this.toRad(center[0]))) / Math.PI) / 2 * (1<<zoom) ));

    return xtile + ':' + ytile + ':' + zoom;
  }

  componentDidUpdate(prevProps) {
    if (this.props.rasterLayerData &&
      prevProps.crosshair.toggled === false && this.props.crosshair.toggled === true) {
      let center = this.mapRef.current.viewport.center;
      this.setState({
        crosshairCoords: center,
      });

      let tileUrl = this.getTileUrl();
      this.props.setTileUrl(tileUrl);
    }
  }

  render() {
    let markers  = <div/>;

    if (this.props.markerData) {
      markers = (
        <LeafletPane
        >
          <LeafletMarkers
            markerData={this.props.markerData}
            type={this.props.markerType}
          />
        </LeafletPane>
      );
    }

    let rasterLayers =  <div/>;
    if (this.props.rasterLayerData) {
      rasterLayers = (
        <LeafletPane>
          <LeafletRasterLayers
            layerData={this.props.rasterLayerData}
            onLoadError={this.props.onLoadError && ((error) => this.props.onLoadError(error))}
          />
        </LeafletPane>
      );
    }

    let geoJSONLayers = <div/>;
    if (this.props.geoJSONData) {
      geoJSONLayers = (
        <LeafletPane>
          <LeafletGeoJSONLayers
            geoJSONArray={this.props.geoJSONData}
          />
        </LeafletPane>
      );
    }

    let vectorLayers = <div/>;
    if (this.props.vectorLayerData) {
      vectorLayers = (
        <LeafletPane>
          <LeafletVectorLayers
            layerData={this.props.vectorLayerData}
          />
        </LeafletPane>
      );
    }

    let crosshairIcon = <div/>;
    if (this.props.crosshair.shouldDisplay) {
      crosshairIcon = (
        <LeafletPane>
          <LeafletMarkers
            markerData={[{
              value:'crosshairs',
              geometry: {
                coordinates: this.state.crosshairCoords,
              },
              iconUrl: locationIcon,
              iconSize: [20, 20],
            }]}
            type='IconMarkers'
          />
        </LeafletPane>
      );
    }

    return (
      <div id="map-container">
        <Map
          id="leaflet-map"
          center={this.props.center}
          zoom={this.props.zoomLevel}
          ref={this.mapRef}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {markers}
          {rasterLayers}
          {geoJSONLayers}
          {vectorLayers}
          {this.props.crosshair.toggled && crosshairIcon}
        </Map>
      </div>
    );
  }
}

export default LeafletMap;