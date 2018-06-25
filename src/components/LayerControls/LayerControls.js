import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import _ from 'underscore'
import moment from 'moment'

import './LayerControls.css'

/*
  Dumb little ON / OFF toggle control.
 */
export class LayerVisibilityControls extends Component {
  render() {
    // Only show TOC friendly layers.
    let layers = this.props.layers.filter((v, k) => {
      return v.showInToc !== false && v.tocGroup.indexOf(this.props.group) === 0
    })

    if (this.props.sort) {
      layers = _.sortBy(layers, function(v, k) {
        return v.niceName.toLowerCase()
      })
    }

    const buttons = layers.map((v, k) =>
      <Button
        key={v.layers}
        onClick={() => this.props.onToggleLayer(v.layers)}
        bsStyle={v.status === 'on' ? 'primary' : 'default'}
        className="btn-text-left"
        >
        <FontAwesome
          name={v.status === 'on' ? 'check-square-o' : 'square-o'}
          fixedWidth={true}
          className="fa-toc"
          />
        {v.niceName}
      </Button>
    )

    return (
      <ButtonGroup vertical>
        {buttons}
      </ButtonGroup>
    )
  }
}

/*
  Dumb little 0.5 <=> 1.0 opacity toggle control.
 */
export class LayerOpacityControls extends Component {
  render() {
    // Only support layers that support opacity.
    const layers = this.props.layers.filter((v, k) => {
      return !_.isUndefined(v.opacity)
    })

    return layers.map((v, k) =>
      <LayerButton
        key={v.layers}
        name={v.niceName}
        value={v.opacity}
        onClick={() => this.props.onSetLayerOpacity(v.layers, v.opacity === 1.0 ? 0.5 : 1.0)}
        />
    )
  }
}

export class LayerShortcutControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      time: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only render when necessary!
    return this.props.status !== nextProps.status ||
      this.props.time !== nextProps.time ||
      this.props.selected_identifiers !== nextProps.selected_identifiers ||
      _.isNull(this.state.data)
  }

  componentDidMount() {
    // Fetch the data.
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    // Keep the data in sync if anything important has changed.
    if (
      this.props.status !== prevProps.status ||
      this.props.time !== prevProps.time
    ) {
      this.getData()
    }
  }

  getData() {
    // Only fetch data if the layer is visible and the times don't match between props and state.
    // The state's time will be updated to match the prop's time once a fetch has been finished.
    if (this.props.status === 'on' && this.props.time !== this.state.time) {
      this.props.onLoadStart(this.props.layers)
      const url = this.props.url + '?time=' + this.makeQueryTimeString(this.props.time)
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            data: responseJson,
            time: this.props.time,
          })
          this.props.onLoadDone(this.props.layers)
        })
        .catch((error) => {
          console.error(error)
          this.props.onLoadDone(this.props.layers)
        })
    }
  }

  makeQueryTimeString(time) {
    return moment(time).utc().format('YYYY-MM-DDTHH:mm:00+00:00')
  }

  render() {
    if (this.props.status === 'off' || _.isNull(this.state.data)) {
      return <div />
    }

    let features = this.state.data.features
    if (this.props.sort) {
      features = _.sortBy(features, function(v, k) {
        return v.properties.identifier.toLowerCase()
      })
    }

    const buttons = features.map((v, k) => {
      const buttonClass = this.props.selected_identifiers.indexOf(v.properties.identifier) >= 0 ? 'btn-primary' : 'btn-default'
      const iconClass = this.props.selected_identifiers.indexOf(v.properties.identifier) >= 0 ? 'active' : ''

      return (
        <Button
          key={k}
          onClick={() => this.props.onGotoLayer(v.geometry.coordinates, v.properties)}
          className={`btn-text-left ${buttonClass}`}
          >
          <span style={{color: this.props.color}}>
            <FontAwesome
              name='circle'
              fixedWidth={true}
              className={`fa-toc ${iconClass}`}
              />
          </span>
          {v.properties.identifier}
        </Button>
      )
    })

    return (
      <ButtonGroup vertical>
        {buttons}
      </ButtonGroup>
    )
  }
}

/*
  Really lame button!
 */
class LayerButton extends Component {
  render() {
    return (
      <Button
        onClick={() => this.props.onClick(this.props.name)}
        >
        {this.props.name} {this.props.value}
      </Button>
    )
  }
}