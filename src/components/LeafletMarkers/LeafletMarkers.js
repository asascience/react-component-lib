import React, { Component } from 'react';

import { divIcon, icon } from 'leaflet';
import { Marker as LeafletMarker, CircleMarker as LeafletCircleMarker, Tooltip } from 'react-leaflet';

import './LeafletMarkers.css';

class LeafletMarkers extends Component {
  constructor(props) {
    super(props);

    this.makeDivIcon =  this.makeDivIcon.bind(this);
    this.makeCustomDivIcon = this.makeCustomDivIcon.bind(this);
  }

  makeDivIcon(className, text) {
    return divIcon({
      html: '<div class="leaflet-global-conditions ' + className + '">' + text + '</div>',
      iconSize: [40, 40],
      className: 'background-color-transparent',
    })
  }

  makeCustomDivIcon(url, iconSize) {
    return icon({
      iconUrl: url,
      iconSize: iconSize,
    });
  }

  render() {
    let markers = this.props.markerData.map((v, k) => {
      if (this.props.type === 'CircleMarkers') {
        return (
          <LeafletCircleMarker
            key={k}
            center={v.geometry.coordinates}
            radius={v.circleRadius}
            fillOpacity={v.fillOpacity}
            color={v.color}
            weight={v.weight}
            fillColor={v.fillColor}
            onClick={v.onClick}
            >
            <Tooltip offset={[10, 0]} direction="right">
              <span><b>{v.identifier}</b><br />{v.tooltipText}</span>
            </Tooltip>
          </LeafletCircleMarker>
        )
      } else if (this.props.type === 'IconMarkers') {
        let icon = this.makeCustomDivIcon(v.iconUrl, v.iconSize);

        return (
          <LeafletMarker
            key={k}
            icon={icon}
            position={v.geometry.coordinates}
          />
        );
      } else {
        let icon =  this.makeDivIcon(this.props.className, v.value);

        return (
          <LeafletMarker
            key={k}
            icon={icon}
            position={v.geometry.coordinates}
            onClick={v.onClick}
            >
            <Tooltip offset={[15, 0]} direction="right">
              <span><b>{v.identifier}</b><br/>{v.tooltipText}</span>
            </Tooltip>
          </LeafletMarker>
        );
      }
    });

    return (
      <div>
        {markers}
      </div>
    );
  }
}

export default LeafletMarkers;