import React, { Component } from 'react'
import { Image } from 'react-bootstrap'

import './Image.css'

export class ImageThumbnailStrip extends Component {
  componentDidMount() {
  }

  onClick(src) {
    window.open(src)
  }

  render() {
    const images = this.props.images.map((v, k) => {
      return (
        <a key={k} className="thumbnail pointer-cursor" onClick={() => this.onClick(v.href)} title={v.title}>
          <Image src={v.thumbnailSrc} thumbnail responsive />
          <div className="caption text-center thumbnail-caption">
            <span>{v.title}</span>
          </div>
        </a>
      )
    })

    return (
      <div>
        {images}
      </div>
    )
  }
}

export default ImageThumbnailStrip;