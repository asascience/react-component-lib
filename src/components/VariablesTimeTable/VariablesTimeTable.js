import React, {Component} from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * Table component for displaying variable csv and allowing for time column selection
 */
class VariablesTimeTable extends Component {
  /**
   * @param {Array.<Array.<string>>} props.csvData - matrix of the raw variable csv values
   * @param {Object} props.selectedColumns - tracks the indices of the selected columns
   * @param {Array.<string>} props.timeSelections - the current selected value for each column (or null)
   * @param {number} props.timeType - 1 (date+time), 2 (date, time), or 3 (at least three of y, m, d, h, m, s)
   * @param {function} props.handleTimeChange - callback for when a time dropdown value is changed
   */

  render() {
    let header;
    let dataRows;
    if (this.props.csvData && this.props.csvData.length > 0) {
      let headerNameLinks = [];
      for (let i = 0; i < this.props.csvData[0].length; i++) {
        let dateTimeDisabled = false;
        if (this.props.timeType === 1) {
          if (this.props.selectedColumns.datetime !== null && this.props.timeSelections[i] !== 'Date + Time') {
            dateTimeDisabled = true;
          }
        }

        let dateDisabled = false;
        let timeDisabled = false;
        if (this.props.timeType === 2) {
          if (this.props.selectedColumns.date !== null && this.props.timeSelections[i] !== 'Date') {
            dateDisabled = true;
          }
          if (this.props.selectedColumns.time !== null && this.props.timeSelections[i] !== 'Time') {
            timeDisabled = true;
          }
        }

        let yearsDisabled = false;
        let monthsDisabled = false;
        let daysDisabled = false;
        let hoursDisabled = false;
        let minutesDisabled = false;
        let secondsDisabled = false;
        if (this.props.timeType === 3) {
          if (this.props.selectedColumns.year !== null && this.props.timeSelections[i] !== 'Years') {
            yearsDisabled = true;
          }
          if (this.props.selectedColumns.month !== null && this.props.timeSelections[i] !== 'Months') {
            monthsDisabled = true;
          }
          if (this.props.selectedColumns.day !== null && this.props.timeSelections[i] !== 'Days') {
            daysDisabled = true;
          }
          if (this.props.selectedColumns.hour !== null && this.props.timeSelections[i] !== 'Hours') {
            hoursDisabled = true;
          }
          if (this.props.selectedColumns.min !== null && this.props.timeSelections[i] !== 'Minutes') {
            minutesDisabled = true;
          }
          if (this.props.selectedColumns.sec !== null && this.props.timeSelections[i] !== 'Seconds') {
            secondsDisabled = true;
          }
        }


        let menu;
        if (this.props.timeType === 1) {
          menu = (
            <SelectField
              floatingLabelText='Var'
              value={this.props.timeSelections[i]}
              style={{width: '100px'}}
            >
              <MenuItem
                value={null}
                primaryText=''
                secondaryText='Clear'
                onTouchTap={(e) => this.props.handleTimeChange(i, null)}
              />
              <MenuItem
                value={'Date + Time'}
                primaryText='Date + Time'
                disabled={dateTimeDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Date + Time')}
              />
            </SelectField>
          );
        } else if (this.props.timeType === 2) {
          menu = (
            <SelectField
              floatingLabelText='Var'
              value={this.props.timeSelections[i]}
              style={{width: '100px'}}
            >
              <MenuItem
                value={null}
                primaryText=''
                secondaryText='Clear'
                onTouchTap={(e) => this.props.handleTimeChange(i, null)}
              />
              <MenuItem
                value={'Date'}
                primaryText='Date'
                disabled={dateDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Date')}
              />
              <MenuItem
                value={'Time'}
                primaryText='Time'
                disabled={timeDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Time')}
              />
            </SelectField>
          );
        } else if (this.props.timeType === 3) {
          menu = (
            <SelectField
              floatingLabelText='Var'
              value={this.props.timeSelections[i]}
              style={{width: '100px'}}
            >
              <MenuItem
                value={null}
                primaryText=''
                secondaryText='Clear'
                onTouchTap={(e) => this.props.handleTimeChange(i, null)}
              />
              <MenuItem
                value={'Years'}
                primaryText='Years'
                disabled={yearsDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Years')}
              />
              <MenuItem
                value={'Months'}
                primaryText='Months'
                disabled={monthsDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Months')}
              />
              <MenuItem
                value={'Days'}
                primaryText='Days'
                disabled={daysDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Days')}
              />
              <MenuItem
                value={'Hours'}
                primaryText='Hours'
                disabled={hoursDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Hours')}
              />
              <MenuItem
                value={'Minutes'}
                primaryText='Minutes'
                disabled={minutesDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Minutes')}
              />
              <MenuItem
                value={'Seconds'}
                primaryText='Seconds'
                disabled={secondsDisabled}
                onTouchTap={(e) => this.props.handleTimeChange(i, 'Seconds')}
              />
            </SelectField>
          );
        }

        headerNameLinks.push(
          <TableRowColumn key={i}>
            {menu}
          </TableRowColumn>
        );
      }

      header = (
        <TableRow
          key={0}
          style={{height: '30px'}}
          selectable={false}
        >
          {headerNameLinks}
        </TableRow>
      );

      dataRows = this.props.csvData.map((rowData, rowIndex) => {
        // if (rowIndex >= this.props.headerRows) {
          let row = rowData.map((cell, colIndex) => {
            return(
              <TableRowColumn key={colIndex}>
                {cell}
              </TableRowColumn>
            );
          });

          return (
            <TableRow
              key={rowIndex+1}
              style={{height: '40px'}}
              selectable={false}
            >
              {row}
            </TableRow>
          );
        // }
      });
    }

    return (
      <div>
        <Table
          fixedHeader={true}
          selectable={false}
          style={{tableLayout: 'auto'}}
          bodyStyle={{overflow: 'auto'}}
        >
          <TableBody
            style={{height: 'auto'}}
            displayRowCheckbox={false}
          >
            {header}
            {dataRows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default VariablesTimeTable;
