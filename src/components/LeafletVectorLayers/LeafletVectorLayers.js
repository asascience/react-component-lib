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
            key={k}
            center={v.center}
            radius={v.radius}
            color={v.color}
            opacity={v.fillColor}
            weight={v.weight}
          />
        );
      } else if (v.type === 'rectangle') {
        return (
          <LeafletRectangleLayer
            key={k}
            bounds={v.bounds}
            color={v.color}
            opacity={v.opacity}
            weight={v.weight}
          />
        );
      } else if (v.type === 'polygon') {
        return (
          <LeafletPolygonLayer
            key={k}
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
            key={k}
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