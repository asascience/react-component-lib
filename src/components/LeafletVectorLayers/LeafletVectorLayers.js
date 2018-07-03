import React, { Component } from 'react';

import LeafletCircleLayer from '../LeafletShapeLayers/LeafletCircleLayer';
import LeafletRectangleLayer from '../LeafletShapeLayers/LeafletRectangleLayer';
import LeafletPolygonLayer from '../LeafletShapeLayers/LeafletPolygonLayer';
import LeafletPolylineLayer from '../LeafletShapeLayers/LeafletPolylineLayer';

class LeafletVectorLayers extends Component {
  render() {
    let layers = <div/>;
    layers = this.props.layerData.map((v, k) => {
      if (v.type === 'circle') {
        return (
          <LeafletCircleLayer
            center={v.center}
            radius={v.radius}
            color={v.color}
            fillColor={v.fillColor}
            opacity={v.opacity}
            fillOpacity={v.fillOpacity}
            weight={v.weight}
            stroke={v.stroke}
          />
        );
      } else if (v.type === 'rectangle') {
        return (
          <LeafletRectangleLayer
            bounds={v.bounds}
            color={v.color}
            fillColor={v.fillColor}
            opacity={v.opacity}
            fillOpacity={v.fillOpacity}
            weight={v.weight}
            stroke={v.stroke}
          />
        );
      } else if (v.type === 'polygon') {
        return (
          <LeafletPolygonLayer
            vertices={v.vertices}
            color={v.color}
            fillColor={v.fillColor}
            opacity={v.opacity}
            fillOpacity={v.fillOpacity}
            weight={v.weight}
            stroke={v.stroke}
          />
        );
      } else if  (v.type === 'polyline') {
        return (
          <LeafletPolylineLayer
            vertices={v.vertices}
            color={v.color}
            opacity={v.opacity}
            weight={v.weight}
          />
        );
      }
    })

    return (
      <div>{layers}</div>
    )
  }
}

export default  LeafletVectorLayers;