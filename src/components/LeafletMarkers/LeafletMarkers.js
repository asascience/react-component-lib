import React, { Component } from 'react'

import { divIcon } from 'leaflet'
import { Marker as LeafletMarker, CircleMarker as LeafletCircleMarker, Tooltip } from 'react-leaflet'

import './LeafletMarkers.css'

class LeafletMarkers extends Component {
  makeDivIcon(className, text) {
    return divIcon({
      html: '<div class="leaflet-global-conditions ' + className + '">' + text + '</div>',
      iconSize: [40, 40],
      className: 'background-color-transparent',
    })
  }

  render() {
    let markers = this.props.markerData.map((v, k) => {
      if (this.props.type === 'CircleMarkers') {
        return (
          <LeafletCircleMarker
            key={k}
            center={[v.geometry.coordinates[1], v.geometry.coordinates[0]]}
            radius={this.props.circleRadius}
            fillOpacity={this.props.fillOpacity}
            color={this.props.color}
            weight={this.props.weight}
            fillColor={this.props.fillColor}
            onClick={e => this.props.onClick(e)}
            >
            <Tooltip offset={[10, 0]} direction="right">
              <span><b>{v.identifier}</b><br />{v.tooltipText}</span>
            </Tooltip>
          </LeafletCircleMarker>
        )
      } else {
        let icon =  this.makeDivIcon(this.props.className, v.value);

        return (
          <LeafletMarker
            key={k}
            icon={icon}
            position={[v.geometry.coordinates[1], v.geometry.coordinates[0]]}
            onClick={e => this.props.onClick(e)}
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