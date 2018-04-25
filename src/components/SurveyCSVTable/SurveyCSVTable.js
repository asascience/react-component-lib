import React, {Component} from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/**
 * Table component for displaying survey csv and controlling the selection of x/y/z variables
 */
class SurveyCSVTable extends Component {
	/**
	 * @param {Array.<Array.<string>>} props.csvData - matrix of the raw csv values for the table
	 * @param {Object} props.selectedColumns - tracks the indices of the selected x/y/z columns
	 * @param {Array} props.variableSelections - array containing the x/y/z or null selection for each variable
	 * @param {function} props.handleVariableChange - callback for when a dropdown value is changed
	 */

	render() {
		let header;
		let dataRows;
		if (this.props.csvData && this.props.csvData.length > 0) {
			let headerNameLinks = [];
			for (let i = 0; i < this.props.csvData[0].length; i++) {
				// Loop through the selected columns (x, y, z) or (x, y, z, id)
				let disabled = {};
				Object.keys(this.props.selectedColumns).forEach((key, index)=>{
					let boolVal = this.props.selectedColumns[key] !== null && this.props.variableSelections[i] !== key;
					disabled[key] = boolVal;
				});
				let headerNameMenuItems = [(
					<MenuItem
						value={null}
						primaryText=''
						secondaryText='Clear'
						onTouchTap={(e) => this.props.handleVariableChange(i, null)}
					/>)].concat(Object.keys(this.props.selectedColumns).map((key, index)=>{
						return (
							<MenuItem
								value={key}
								primaryText = {key}
								disabled = {disabled[key]}
								onTouchTap={(e) => this.props.handleVariableChange(i, key)}
							/>
						);
				}));

				headerNameLinks.push(
					<TableRowColumn key={i}>
						<SelectField
							floatingLabelText='Var'
							value={this.props.variableSelections[i]}
							style={{width: '60px'}}
						>
							{headerNameMenuItems}
						</SelectField>
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

export default SurveyCSVTable;
