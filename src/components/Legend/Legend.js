import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

import _ from 'underscore'
import moment from 'moment'

import './Legend.css'

export class HazardLegend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      time: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only render when necessary!
    return this.props.time !== nextProps.time ||
      _.isNull(this.state.data) ||
      this.props.data !== this.state.data
  }

  componentDidMount() {
    // Fetch the data.
    this.getData()
  }

  componentDidUpdate(prevProps, prevState) {
    // Keep the data in sync if anything important has changed.
    if (
      this.props.time !== prevProps.time
    ) {
      this.getData()
    }
  }

  getData() {
    const self = this
    if (this.props.status === 'on' && this.props.time !== this.state.time) {
      _.each(this.props.data, function(request, idx) {
        const url = request.url + '?time=' + self.makeQueryTimeString(request.time)
        fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            let data = self.state.data || []
            data.push({
              idx: idx,
              data: responseJson,
            })

            self.setState({
              data: _.sortBy(data, function(d) {
                return d.idx
              }),
              time: self.props.time,
            })
          })
          .catch((error) => {
            console.error(error)
          })
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

    // We don't want to show different versions of the same hazard.
    let colors = {}

    let cols = []
    _.each(this.state.data, function(request) {
      _.each(request.data, function(v, k) {
        if (!/^No active/.test(v.label) && !colors[v.imageData]) {
          // Ignore anything in parens.
          const label = v.label.split('(')[0]

          cols.push(
            <Col md={6} key={k}>
              <img src={'data:' + v.contentType + ';base64,' + v.imageData} alt={label} />
              &nbsp;{label}
            </Col>
          )

          colors[v.imageData] = true
        }
      })
    })
 
    return (
      <div>
        {cols}
      </div>
    )
  }
}

export default HazardLegend;