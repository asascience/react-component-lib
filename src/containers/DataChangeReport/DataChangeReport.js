import React, {Component} from 'react';
import DataTable from 'containers/DataTable/DataTable.js';
import Paper from 'material-ui/Paper';
import RadialProgressChart from 'radial-progress-chart/index.js';
import Divider from 'material-ui/Divider';
import $ from 'jquery';
import clone from 'clone';

/* Displays a report on the changed properties for each section.
 * Props:
 * title - the title displayed at the top of the component.
 * completedFields - number of completed fields
 * totalFields - number of fields
 * tableData - formatted data to be displayed in the table.
 * id - a unique id for the html ids to be assigned.
 */
 /**
  * Summary page component used to display changes in the metadata and variables tables
  */
class DataChangeReport extends Component {
  /**
   * @param {string} props.title - the title to be displayed over the data change table
   * @param {number} props.completedFields - the number of completed fields for the progress chart
   * @param {number} props.totalFields - the total number of possible fields to complete
   * @param {object} props.tableData - the metadata changes object used to populate the table
   * @param {string} props.id - the type of data to be displayed (discoveryData, variableData, surveyData)
   */


  // Called when dom is ready. Set up progress chart.
  componentDidMount() {
    const percentage = Math.round(100 * (this.props.completedFields/this.props.totalFields));
    new RadialProgressChart('#' + this.props.id + 'Chart', {
        diameter: 100,
        stroke: {
          width: 15,
        },
        shadow: {
          width: 0,
        },
        series: [percentage],
        center: {
          content: [percentage + '%', this.props.completedFields + ' OF ' + this.props.totalFields + ' Fields'],
          y: 7,
        },
      });

    // Change the style for the labels.
    const topLineStyle={
      fontFamily: 'Helvetica',
      fontSize: 40,
    };
    const bottomLineStyle={
      fontFamily: 'Helvetica',
      fontSize: 11,
    };
    $('.rbc-center-text-line0').css(topLineStyle);
    $('.rbc-center-text-line1').css(bottomLineStyle);
  }

  render() {
    const discoveryContainerStyle = {
      margin: 'auto',
      padding: '10px',
    };
    const discoveryStyle = {
      padding: '10px',
      margin: '10px',
      textAlign: 'center',
    };
    const paperStyle = {
      width: '95%',
      minWidth: '400px',
      margin: '10px auto',
    };
    const h1Style = {
      fontWeight: 'normal',
      margin: '10px',
      marginTop: '5px',
      textAlign: 'left',
    };
    const h3Style = {
      fontWeight: 'normal',
      margin: '25px 0px 10px 0px',
    };

    /*
    * This is what the structure of the this.props.tableData object should be:
    * [
    *   {
    *     sectionName: 'variable1', // the section name is optional, used for labeling the different variable changes.
    *     changes:[{fieldName: 'Units', original: '--', after: 'meters'}]
    *   }
    * ]
    * Each entry of the high-level arrar corresponds to a different table of changes.
    */

    let tableContent = [];
    this.props.tableData.forEach((changeData, index)=>{
      let formattedData = {content: []};
      let sectionName = changeData.sectionName;
      Object.keys(changeData.changes).forEach((rowKey)=>{
        let row = clone(changeData.changes[rowKey]);
        if (row) {
          formattedData['content'].push([
            {
              text: row.fieldName,
              disabled: true,
            },
            {
              text: row.original || '--',
              disabled: true,
            },
            {
              text: row.after || '--',
              disabled: true,
            },
          ]);
        }
      });
      formattedData['header'] = [
        {text: 'Attribute'},
        {text: 'Original'},
        {text: 'After'},
      ];

      if (formattedData.content.length > 0) {
        tableContent.push(<div key={index}>
          <h3 style={h3Style}>{sectionName}</h3>
          <DataTable
            jsonData={formattedData}
            scrollHeight={'200px'}
            headerEnabled={true}
            disabled={true}
            verbose={true}
            sortingDisabled={true}
          />
        </div>);
      }
    });

    // If there are no tables tracking the changes, tell the user that no changes were detected.
    if (tableContent.length === 0) {
      tableContent =
      (<div>
        <h3 style={h3Style}>No changes detected</h3>
      </div>);
    }

    return (
      <div style={discoveryContainerStyle}>
        <Paper style={paperStyle} rounded={true} zDepth={2}>
          <div style={discoveryStyle}>
            <h1 style={h1Style}>{this.props.title}</h1>
            <Divider />
            {tableContent}
          </div>
        </Paper>
      </div>
    );
  }
}

export default DataChangeReport;
