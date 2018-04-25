import React, {Component} from 'react';
import DataTable from '../DataTable/DataTable.js';
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
      width: '75%',
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
      margin: '20px auto, 15px, 0px',
      marginTop: '20px',
    };
    let tabs;
    if (this.props.flow === 'timeseriesCSV') {
      let domArray = [];
      let groups = [];
      Object.keys(this.props.tableData).forEach((tabKey, index)=>{
        let rows = [];
        Object.keys(this.props.tableData[tabKey]).forEach((rowKey)=>{
          let row = clone(this.props.tableData[tabKey][rowKey]);
          if (row) {
            row['value']['Attribute'] = rowKey;
            delete row['value']['fieldName'];
            row['value']['Original'] = row['value']['original'] || '--';
            delete row['value']['original'];
            row['value']['After'] = row['value']['after'];
            delete row['value']['after'];
            rows.push(row['value']);
          }
        });
        if(this.props.tableData[tabKey].length !== 0) {
          let varName = this.props.tableData[tabKey].name.value.after;
          domArray.push(<div>
            <h3>{varName}</h3>
            <DataTable
              jsonData={rows}
              scrollHeight={'200px'}
              headerEnabled={true}
              disabled={true}
            />
            </div>
          );
          groups.push(rows);
        }
      });
      if(domArray.length === 0) {
        tabs = (<div>
          <h3 style={h3Style}>No changes detected</h3>
        </div>);
      }else{
        tabs = domArray;
      }
    } else if (this.props.id === 'variableData') {
      tabs = [];
      Object.keys(this.props.tableData).forEach((tabKey)=>{
        let attributes = Object.keys(this.props.tableData[tabKey]).map((attributeKey)=>{
          let contents = Object.keys(this.props.tableData[tabKey][attributeKey]).map((fieldKey)=>{
            return Object.keys(this.props.tableData[tabKey][attributeKey][fieldKey]).map((rowKey)=>{
              return {
                text: this.props.tableData[tabKey][attributeKey][fieldKey][rowKey] || '--',
                fieldType: 'textBox',
                disabled: true
              }
            });
          });
          let formattedData = {
            header: [
              {text: 'Attribute'},
              {text: 'Before'},
              {text: 'after'},
            ],
            content: contents,
          }
          return(<div>
            <h3 style={h3Style}>{attributeKey}</h3>
            <DataTable
              jsonData={formattedData}
              scrollHeight={'200px'}
              headerEnabled={true}
              disabled={true}
              verbose={true}
            />
            </div>
          );
        });
        tabs.push(attributes);
      });
      if (tabs.length === 0 || (tabs[0].length === 0 && tabs[1].length === 0)) {
        tabs = (<div>
          <h3 style={h3Style}>No changes detected</h3>
        </div>);
      }
    } else if (this.props.id === 'discoveryData') {
      let formattedData = {content: []};
      Object.keys(this.props.tableData).forEach((tabKey)=>{
        Object.keys(this.props.tableData[tabKey]).forEach((rowKey)=>{
          let row = clone(this.props.tableData[tabKey][rowKey]);
          if (row) {
            formattedData['content'].push([
              {
                text: rowKey,
                disabled: true,
              },
              {
                text: row.original || '--',
                disabled: true,
              },
              {
                text: row.after,
                disabled: true,
              },
            ]);
          }
        });
      });
      formattedData['header'] = [
        {text: 'Attribute'},
        {text: 'Original'},
        {text: 'After'},
      ];

      if (formattedData.content.length > 0) {
        tabs = (<div>
          <h3 style={h3Style}>Discovery Metadata</h3>
          <DataTable
            jsonData={formattedData}
            scrollHeight={'200px'}
            headerEnabled={true}
            disabled={true}
            verbose={true}
          />
        </div>);
      } else {
        tabs = (<div>
          <h3 style={h3Style}>No changes detected</h3>
        </div>);
      }
    } else if (this.props.id === 'surveyData') {
      let formattedData = {content: []};
      Object.keys(this.props.tableData).forEach((tabKey)=>{
        Object.keys(this.props.tableData[tabKey]).forEach((rowKey)=>{
          let row = clone(this.props.tableData[tabKey][rowKey]);
          if (row) {
            formattedData.content.push([
              {
                text: rowKey,
                disabled: true,
              },
              {
                text: row.original || '--',
                disabled: true,
              },
              {
                text: row.after,
                disabled: true,
              },
            ]);
          }
        });
      });
      formattedData['header'] = [
        {text: 'Attribute'},
        {text: 'Original'},
        {text: 'After'},
      ];

      if (formattedData.content.length > 0) {
        tabs = (<div>
          <h3 style={h3Style}>Survey Metadata</h3>
          <DataTable
            jsonData={formattedData}
            scrollHeight={'200px'}
            headerEnabled={true}
            disabled={true}
            verbose={true}
          />
        </div>);
      } else {
        tabs = (<div>
          <h3 style={h3Style}>No changes detected</h3>
        </div>);
      }
    }
    return(
      <div style={discoveryContainerStyle}>
        <Paper style={paperStyle} rounded={true} zDepth={2}>
          <div style={discoveryStyle}>
            <h1 style={h1Style}>{this.props.title}</h1>
            <Divider />
            {/* }
            <div style={chartContainerStyle}>
              <div style={chartStyle} className="chart" id={this.props.id + 'Chart'}></div>
            </div>
          */}
            {tabs}
          </div>
        </Paper>
      </div>
    );
  }

}
export default DataChangeReport;
