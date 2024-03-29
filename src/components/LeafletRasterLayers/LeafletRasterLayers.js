import React, { Component } from 'react';

import LeafletWMSLayer from '../LeafletWMSLayer/LeafletWMSLayer';

class LeafletRasterLayers extends Component {
  constructor(props){
    super(props);
    this.state = {
      shouldRenderWMSLayers: true,
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.layerData[0].elevation !== this.props.layerData[0].elevation ||
      prevProps.layerData[0].colorScaleRange !== this.props.layerData[0].colorScaleRange ||
      prevProps.layerData[0].numberOfColorBands !== this.props.layerData[0].numberOfColorBands) {
      this.setState({shouldRenderWMSLayers: false});
    }
  }
  render() {
    if(this.state.shouldRenderWMSLayers === false) {
      this.setState({shouldRenderWMSLayers: true});
      return(<div></div>);
    }
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
            onLoadError={this.props.onLoadError && ((error) => this.props.onLoadError(error))}
            logScale={v.logScale}
            numberOfColorBands={v.numberOfColorBands}
            colorScaleRange={v.colorScaleRange}
            elevation={v.elevation}
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