import React, { Component } from 'react';

import LeafletWMSLayer from '../LeafletWMSLayer/LeafletWMSLayer';

class LeafletRasterLayers extends Component {
  render() {
    const layers = this.props.layerData.map((v, k) => {
      if (v.type === 'WMS') {
        return (
          <LeafletWMSLayer
            key={k}
            url={v.url}
            layers={v.layers}
            styles={v.styles}
            format={v.format}
            transparent={v.transparent}
            opacity={v.opacity}
            version={v.version}
            time={v.time}
            />
        )
      }
      // #TODO: Add ESRI Data Layer
      // else if (v.type === 'ESRI') {
      //   return (
      //     <EsriDynamicMapLayer
      //       key={v.niceName}
      //       niceName={v.niceName}
      //       url={v.url}
      //       layers={v.layers}
      //       opacity={v.opacity}
      //       time={this.props.time}
      //       onLoadStart={this.props.onLoadStart}
      //       onLoadDone={this.props.onLoadDone}
      //       />
      //   )
      // }

      return <div />
    })

    return (
      <div>{layers}</div>
    )
  }
}

export default  LeafletRasterLayers;