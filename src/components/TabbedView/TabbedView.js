import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import DataTable from '../DataTable/DataTable';

// A view with tabs each containing a table.
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
    const sections = this.props.jsonData && Object.keys(this.props.jsonData).map((key, index) => {
      return(
        <Tab key={index} label={key}>
            <DataTable
              key={key}
              outerName={key}
              verbose={true}
              jsonData={this.props.jsonData[key]}
              edited={this.props.edited}
              headerEnabled={this.props.headerEnabled}
              tableType={this.props.tableType}
              scrollHeight={this.props.height}
              onTextUpdate={(jsonPath, newValue)=>{
                this.props.onTextUpdate(key, jsonPath, newValue);
                }
              }
            />
        </Tab>
      );
    });
    return(
        <div className='TabbedView'>
          <Tabs inkBarStyle={{background: 'black'}}>
            {sections}
          </Tabs>
        </div>
        );
  }
}
export default TabbedView;
