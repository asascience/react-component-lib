import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';
import DataTable from 'containers/DataTable/DataTable';

/**
 * Component controlling the display of multiple tabs of a DataTable
 */
class TabbedView extends Component {
  /**
   * @param {Object.<Array.<Object>>} props.jsonData - a set of nested object arrays to be displayed in each tab
   * @param {boolean} props.headerEnabled - whether the header row should be enabled in the tables
   * @param {string} props.tableType - 'acdd' or 'variables' to control special display
   * @param {number} props.height - a max height for the table
   * @param {function} props.onTextUpdate - callback for when a text change is made
   * @param {boolean} props.edited - whether the data has been edited
   */

  render() {
    const unsavedStyle = {
      display: 'flex',
    };
    const dotStyle = {
      position: 'relative',
      display: 'block',
      backgroundColor: 'white',
      borderRadius: '4.5px',
      width: '9px',
      height: '9px',
      margin: 'auto 5px',
    };


    const sections = this.props.jsonData && Object.keys(this.props.jsonData).map((key, index) => {

      let label = this.props.unsaved ? (
        <div style={unsavedStyle}>
          <div style={dotStyle}/>
          {key}
        </div>
      ) : key;

      return (
        <Tab key={index} label={label}>
            <DataTable
              key={key}
              outerName={key}
              verbose={true}
              jsonData={this.props.jsonData[key]}
              edited={this.props.edited}
              headerEnabled={this.props.headerEnabled}
              tableType={this.props.tableType}
              scrollHeight={this.props.height}
              onTextUpdate={(propKey, newValue)=>{
                this.props.onTextUpdate(propKey, newValue);
                }
              }
            />
        </Tab>
      );
    });

    return (
      <div className='TabbedView'>
        <Tabs inkBarStyle={{background: 'black'}}>
          {sections}
        </Tabs>
      </div>
    );
  }
}

TabbedView.propTypes = {
  jsonData: PropTypes.object,
  headerEnabled: PropTypes.bool,
  tableType: PropTypes.string,
  height: PropTypes.number,
  onTextUpdate: PropTypes.func,
  edited: PropTypes.bool,
};

export default TabbedView;
