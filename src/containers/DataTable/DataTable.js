import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Info from 'material-ui/svg-icons/action/info-outline';
import SwapVert from 'material-ui/svg-icons/action/swap-vert';
import IconButton from 'material-ui/IconButton';
import DataTableFieldInput from './DataTableFieldInput';
import standardNames from 'utils/autocomplete/StandardNameFiltered.js';

/**
   * A comparator function wrapper used ultimately for vertical sorting
   * @param {Array} toSort - the array to be sorted
   * @param {Number} indx - the index of a particular column in an array
   * @param {Boolean} sortAscending - sort ascending (true) descending (false)
   * @return {Object} - keys: sortedArray, sortedIndices
   */
function sortWithIndex(toSort, indx, sortAscending) {
  for (let i = 0; i < toSort.length; i++) {
    toSort[i] = {[i]: toSort[i]};
  }

  let unit = sortAscending ? 1 : -1;

  // a, b are objects being compared (i.e. left/right)
  toSort.sort(function(a, b) {
    let aKey = Object.keys(a)[0];
    let bKey = Object.keys(b)[0];
    return a[aKey][indx]['text'].toLowerCase() === b[bKey][indx]['text'].toLowerCase() ? 0 :
      a[aKey][indx]['text'].toLowerCase() < b[bKey][indx]['text'].toLowerCase() ? -unit : unit;
  });

  let sortedIndices = [];
  for (let j = 0; j < toSort.length; j++) {
    sortedIndices.push(parseInt(Object.keys(toSort[j])[0], 10));
    toSort[j] = toSort[j][Object.keys(toSort[j])];
  }
  return {
    sortedArray: toSort,
    sortedIndices: sortedIndices,
  };
}

/**
   * Used to determine if 2 arrays contain the same elements
   * @param {Array} a - the first array
   * @param {Array} b - the second array
   * @return {Boolean} - true indicates the arrays contain the same elements otherwise false
   */
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}


/* Defines a row in the table.
* Props
* rowObject - a json object of form [{name: '', format: '', description: ''}...]
* uniqueId - id used for key generation
* onTextUpdate - callback for editing.
* description is optional.
* disabled - determines if the text fields should be disabled
*/
/**
 * Renders a single row of the the data table component
 */
class DataRow extends Component {
  /**
   * @param {Array.<object>} props.jsonObject - a json array containing the list of cell objects to be rendered
   * @param {number} props.uniqueId - the unique id of the row (determined in DataTable iterator)
   * @param {function} props.onTextUpdate - a callback for when data cells are edited
   * @param {string} [props.description] - an optional link to display in an info tooltip
   * @param {boolean} props.disabled - whether the data cells should be disabled for editing
   */

  render() {
    // check the first object hidden attribute to see if this row is hidden
    if (this.props.rowObject[0]['hidden']) {
      return null;
    }

    // Iterate through the data to create an array of columns.
    const columns = this.props.rowObject.map((object, index)=> {
      let columnElement;
      if (object.format === 'text' || object.format === 'label') {
        // Plain text for a label format.
        columnElement = <p style={{display: 'inline-block', fontSize: '16px', textAlign: 'center'}}>{object.text}</p>;
      } else {
        // Data Table Field Input takes the given props and renders an appropriate input component.
        // If you want to add more input components, edit the DataTableFieldInput.
        columnElement = <DataTableFieldInput
                          objectData={object}
                          index={index}
                          uniqueID={this.props.uniqueID}
                          onUpdate={this.props.onTextUpdate}
                          disabled = {object.disabled}
                          acddLinkUrl={this.props.acddLinkUrl}
                        />;
      }
      // The following has an inline conditional that checks if the description is present
      // and inserts a popover and info button.
      return(
        <TableRowColumn key={index} style= {{overflow: 'visible'}}>
          <div style={{display: 'flex', textAlign: 'center'}}>
            {columnElement}
          </div>
        </TableRowColumn>
      );
    }, this);
    return(
      <TableRow style={{height: '70px', width: '400px'}}>
        {columns}
      </TableRow>
    );
  }
}

/*
* This is a table for displaying the variables.
* Props:
* jsonData - An array of objects in which each object represents a
* row. Each key of the object is the header of the column. The keys
* correspond to sub-objects which represent rows. The rows have title,
* description, severity and type keys. Example:
* [
*   {
*     key: "title",
*     value: {
*       description: "whatever",
*       fieldType: "textBox",
*       name: "",
*       severity: "required"
*     }
*   }
* ]
* verbose - (bool) indicates that the jsonData is in the old verbose
* format.
* scrollHeight - a value for the height of the table when
* scrolling is enabled. If undefined no scrolling.
* headerEnabled - if the table should show a header.
* disabled - determines if the text fields should be disabled
*/
/**
 * Data table component used to display metadata and variables data
 */
class DataTable extends Component {
  /**
   * @param {array} props.jsonData - an array of objects in which each object represents a row (the key is the column header)
   * @param {boolean} props.headerEnabled - whether the header row of the table should be shown
   * @param {boolean} props.disabled - whether the text fields of the table should be disabled
   * @param {boolean} props.sortingDisabled - whether the sorting feature is allowed, determines if icon is shown.
   */
  constructor(props) {
    super(props);

    this.state = {
      sortBy: null,
      activeSort: false,
    };

    this.handleVerticalSwap = this.handleVerticalSwap.bind(this);

    this.acddLinkUrl = 'http://wiki.esipfed.org/index.php/Attribute_Convention_for_Data_Discovery#';
    this.varUnitsUrl = 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#units';
    this.varStanNameUrl = 'http://cfconventions.org/Data/cf-standard-names/27/build/cf-standard-name-table.html';
    this.varLongNameUrl = 'http://cfconventions.org/Data/cf-conventions/cf-conventions-1.6/build/cf-conventions.html#long-name';
  }

  /**
   * @typedef {Object} TableContentJSON
   * @property {string} name - the name of the field used to access the data
   * @property {string} fieldText - the optional text to be displayed in the field
   * @property {string} format - either 'text' or 'edit' for static label or editable field
   * @property {string} description - an optional link for the cell info button
   * @property {string[]} dataSource - an optional datasource array for the autocomplete fields
   * @property {string} acdd_description - the hover tooltip for acdd table elements
   * @property {string} severity - 'required' if the cell is required
   * @property {Object} pathInJson - the path in json to the edited field
   */

  /**
   * @typedef {Object} TableJSON
   * @property {Array.<Object>} header - an array of header objects containing titles and optional links
   * @property {Array.<Array.<TableContentJSON>>} - a 2d array of the table content json
   */

  /**
   * Transforms the json data passed in into a format that can be used by the table
   *
   * @param {object} jsonData - the unformatted json passed into the table
   *
   * @return {TableJSON} - the complex object used to populate the data table
   */

  transformJSON(jsonData) {
    let variableType = this.props.outerName;
    let content = jsonData.map((row, outerIndex)=>{
      let name = row['Variable Name'];
      let formattedRow = Object.keys(row).reduce((a, columnKey, index)=>{
        let rowObject = row[columnKey];
        if(rowObject === undefined) return a;

        let fieldText = (typeof rowObject) === 'object' && rowObject.name !== undefined
          ? rowObject.name : rowObject !== undefined ? rowObject.toString() : '';

        if (!name) {
          name = fieldText;
        }
        let linkDescription;
        let attrDescription;
        let dataSource;
        let validated;
        if (this.props.tableType === 'acdd' && index === 0) {
          linkDescription = this.acddLinkUrl + name;
          attrDescription = row['value'].description ? row['value'].description : name;
        } else if (this.props.tableType === 'survey') {
          if (index === 0) {// Title
            linkDescription = process.env.REACT_APP_SURVEY_POINT_FILE_UPLOAD_SERVER_IP;
            attrDescription = row['value'].description ? row['value'].description : name;
          } else if (index === 1) {// Value
            dataSource = row['value'].options ? row['value'].options : null;
          }
        } else if (this.props.tableType === 'variables') {
          // Skip the units validated and standardNameValue keys
          if(columnKey === 'unitsValidated' || columnKey === 'standardNameValidated')return a;
          if(columnKey === 'Units') validated = row.unitsValidated;
          if(columnKey === 'Standard Name') validated = row.standardNameValidated;
          if (index === 2) {
            dataSource = standardNames;
          }
        }

        // TODO: this needs to be updated to conform to new standard.. i.e. 'ui:severity'
        a.push({
          name: name,
          text: fieldText,
          format: index === 0 ? 'text' : 'edit',
          description: linkDescription,
          dataSource: dataSource,
          acdd_description: attrDescription,
          severity: rowObject.severity,
          fieldType: rowObject.fieldType,
          options: rowObject.options,
          disabled: rowObject.disabled,
          validated: validated,
          pathInJson: {'variableType': variableType,
                       'rowIndex': outerIndex,
                       'field': columnKey},
        });
        return a;
      }, []);
      return formattedRow;
    });

    let headers = Object.keys(jsonData[0]).filter((word) => word !== 'standardNameValidated' &&
      word !== 'unitsValidated');


    let headerData = [];
    // Search through the first row to determine if any field is required
    for (let i = 0; i < headers.length; i++) {
      let name = headers[i];
      if (jsonData[0][headers[i]] && jsonData[0][headers[i]].severity === 'required') {
        name += ' *';
      }
      headerData[i] = {name: name};
      if (this.props.tableType === 'variables') {
        switch (name) {
          case 'Units': headerData[i]['link'] = this.varUnitsUrl; break;
          case 'Standard Name': headerData[i]['link'] = this.varStanNameUrl; break;
          case 'Long Name': headerData[i]['link'] = this.varLongNameUrl; break;
          default: break;
        }
      }
    }
    return {header: headerData, content: content};
  }

   /**
   * Update component state when clicking on a column's vertical swap button
   * @param {Object} obj - An object containing information about the header column clicked on
   * @param {string} obj.text - The name of the employee.
   * @param {string} obj.sortType - The type of sorting to be used. Not used at this time.
   * @param {string} obj.link - The ACDD link string.
   * @param {string} obj.colIndex - The numerical index of the column clicked (from left to right).
   */
  handleVerticalSwap(obj) {
    this.setState(function(prevState, props) {
      let sortAscending;
      let colName = obj.text.replace(' ', '') + 'SortAscending';
      if (prevState[colName]) {
        sortAscending = !prevState[colName];
      } else {
        sortAscending = true;
      }

      return {
        [colName]: sortAscending,
        sortBy: obj.text,
        activeSort: true,
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.outerName !== 'Variables') {
      return;
    }

    // only apply sorting state changes if we are on the variables page
    let defaultOrder = nextProps.jsonData.content.map(function(arr,indx) {
      return arr[0]['sortIndx'];
    });
    let presentOrder = this.props.jsonData.content.map(function(arr) {
      return arr[0]['sortIndx'];
    });

    if (!arraysEqual(defaultOrder, presentOrder)) {
      this.setState(function(prevState, props) {
        return {
          tableSortOrder: presentOrder,
          activeSort: false,
        };
      });
    }
  }

  render() {
    let header;
    let dataRows=[];
    if (this.props.jsonData) {
      // Only transform the json if verbose is false.
      let transformedJSON = this.props.verbose ? this.props.jsonData : this.transformJSON(this.props.jsonData);

      // Styling for the column headers
      const headerStyle = {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
      };

      let updown;
      let headerNameArr = transformedJSON.header.map((headerCol) => headerCol.text);

      if (this.props.headerEnabled) {
        // Create a list of elements representing the table header rows.
        let headerNames = transformedJSON.header.map((object, index)=>{
          let headerLink = object.link ?
            <IconButton href={object.link} target='_blank' rel='noopener noreferrer'>
              <Info color='#0645AD'/>
            </IconButton> : null;

            let propsObj = Object.assign(object, {colIndex: index});
            if (!this.props.sortingDisabled) {
              updown = (<IconButton style={{marginRight: -14}}
                                    onClick={this.handleVerticalSwap.bind(this, propsObj)}>
                                        <SwapVert color='#595959' viewBox ='0 0 32 12'/>
                                      </IconButton>);
            }
          return(
            <TableHeaderColumn style={headerStyle} key={index}>
              <div>{updown}{object.text}{headerLink}</div>
            </TableHeaderColumn>
          );
        });
        header = (
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow selectable={false}>
              {headerNames}
            </TableRow>
          </TableHeader>
        );
      }

      let contentArray = transformedJSON.content;
      if (this.state.sortBy && this.state.activeSort) {
        // get the index of column
        let headerIndex = headerNameArr.indexOf(this.state.sortBy);
        let sortAscending = this.state[this.state.sortBy.replace(' ', '') + 'SortAscending'];
        let output = sortWithIndex(transformedJSON.content, headerIndex, sortAscending);
        contentArray = output.sortedArray;
      }

      let tableSortOrder = this.state.tableSortOrder ? this.state.tableSortOrder :
        contentArray.map(function(item, indx) {return indx;});

      for (let i=0; i<contentArray.length; i++) {
        let object = this.state.activeSort ? contentArray[i] : contentArray[tableSortOrder[i]];

        dataRows.push(<DataRow key={i}
           rowObject={object}
           onTextUpdate={this.props.onTextUpdate}
           uniqueID={i}
           acddLinkUrl={this.acddLinkUrl}
        />);
      }
    }
    // build the table
    return(
      <Table fixedHeader={true}>
        {header}
        <TableBody>
          {dataRows}
        </TableBody>
      </Table>
    );
  }
}

DataTable.propTypes = {
  jsonData: PropTypes.shape({
    header: PropTypes.array,
    content: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.object)
    ),
  }),
  verbose: PropTypes.bool,
  scrollHeight: PropTypes.string,
  headerEnabled: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default DataTable;