import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {GridList, GridTile} from 'material-ui/GridList';
import URL from 'url';
import errorPlaceholder from './errorPlaceholder.png';

import './WMSStylesSelectorDrawer.css';

class WMSStylesSelectorDrawer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tileUrlObject;
    if (this.props.tileUrl) {
      tileUrlObject = URL.parse(this.props.tileUrl, true);
    }

    let styleUrlObject = tileUrlObject;
    let styleImages = [];
    if (styleUrlObject) {
      styleImages = this.props.styles.map((style, index) => {
        styleUrlObject.query.styles = style;
        styleUrlObject.search = undefined;
        let styleImageSrc = URL.format(styleUrlObject);

        let tileWrapper = (
          <div onClick={(e) => this.props.onSelectStyle(index)} className='sd-tile-wrapper'/>
        );

        let styleImage = (
          <img src={styleImageSrc} onError={(e)=>{e.target.src=errorPlaceholder}}/>
        );

        return (
          <GridTile
            key={index}
            title={style}
            containerElement={tileWrapper}
          >
            {styleImage}
          </GridTile>
        );
      });
    }

    return (
      <Drawer
        width={550}
        openSecondary={true}
        open={this.props.open}
      >
        <div className='sd-contents-wrapper'>
          <div className='sd-header'>
            <h1 className='sd-header-text'>Style Options</h1>
            <div className='sd-close-button'>
              <IconButton
                onClick={this.props.onClose}
              >
                <CloseIcon/>
              </IconButton>
            </div>
          </div>
          <div className='sd-body'>
            <GridList
              cellHeight={256}
              padding={8}
              className='sd-grid-list'
            >
              {styleImages}
            </GridList>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default WMSStylesSelectorDrawer;
