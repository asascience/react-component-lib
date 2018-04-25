import React, {Component} from 'react';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import VariablesModal from './VariablesCSVModal';

/**
 * Table component for displaying variable csv and controlling the editing VariablesCSVModal instances
 *
 * @prop {Array.<boolean>} modalOpenStates - describes which modals are open and closed
 * @prop {Array.<boolean>} columnEnabled - descibes which variable columns are enabled (true) and disabled (false)
 */
class VariablesCSVTable extends Component {
	/**
	 * @param {Array.<Array.<string>>} props.csvData - matrix of the raw variable csv values
	 * @param {Array.<Object>} props.variableMetadata - array of the variable metadata objects
	 * @param {function} props.handleEnableVariable - callback for when a variable checkbox is triggered
	 * @param {function} props.handleSaveVariable - callback for when a variable is saved in the editing modal
	 */
	constructor(props) {
		super(props);

		let modalOpenStates = [];
		let columnEnabled = [];
		for (let i = 0; i < this.props.csvData[0].length; i++) {
			modalOpenStates[i] = false;
			columnEnabled[i] = true;
		}

		this.state = {
			modalOpenStates: modalOpenStates,
			columnEnabled: columnEnabled,
		};

		this.selectEditButton = this.selectEditButton.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleSaveVariable = this.handleSaveVariable.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	/**
	 * Opens the relevant modal when an edit button is selected
	 *
	 * @param {number} index - the column index of the selected button
	 */
	selectEditButton(index) {
		let modalStates = this.state.modalOpenStates;
		modalStates[index] = true;
		this.setState({
			modalOpenStates: modalStates,
		});
	}

	/**
	 * Handles the enabling/disabling of a variable from a checkbox selection
	 *
	 * @param {number} index - the column index of the selected checkbox
	 * @param {boolean} isChecked - whether the checkbox is now checked (enabled) or not
	 */
	handleCheck(index, isChecked) {
		let columnStates = this.state.columnEnabled;
		columnStates[index] = isChecked;
		this.setState({
			columnEnabled: columnStates,
		});
		this.props.handleEnableVariable(index, isChecked);
	}

	/**
	 * Handles the saving of a variable from the modal
	 *
	 * @param {number} index - the column index of the saved variable
	 * @param {Object} newData - the edited data to be saved
	 */
	handleSaveVariable(index, newData) {
		let modalStates = this.state.modalOpenStates;
		modalStates[index] = false;
		this.setState({
			modalOpenStates: modalStates,
		});
		this.props.handleSaveVariable(index, newData);
	}

	/**
	 * Handles the canceling of variable edits in a modal
	 *
	 * @param {number} index - the column index of the cancelled variable edits
	 */
	handleCancel(index) {
		let modalStates = this.state.modalOpenStates;
		modalStates[index] = false;
		this.setState({
			modalOpenStates: modalStates,
		});
	}

	render() {
		let header;
		let dataRows;
		let modals = [];
		if (this.props.csvData && this.props.csvData.length > 0) {
			let headerNameLinks = [];
			for (let i = 0; i < this.props.csvData[0].length; i++) {
				if (!this.props.variableMetadata[i].isTimeVar) {
					headerNameLinks.push(
						<TableRowColumn key={i}>
							<div style={{display: 'flex', alignItems: 'center'}}>
								<Checkbox
									checked={this.state.columnEnabled[i]}
									style={{width: '20px'}}
									onCheck={(e, isChecked) => this.handleCheck(i, isChecked)}
								/>
								<h3 style={{marginRight: '10px', marginLeft: '-5px'}}>{this.props.variableMetadata[i].name}</h3>
								<RaisedButton
									label='Edit'
									labelPosition='before'
									icon={<EditIcon/>}
									onTouchTap={(e) => this.selectEditButton(i)}
									disabled={!this.state.columnEnabled[i]}
								/>
							</div>
						</TableRowColumn>
					);
				} else {
					headerNameLinks.push(
						<TableRowColumn key={i}>
							<h3>{this.props.variableMetadata[i].name}</h3>
						</TableRowColumn>
					);
				}
			}

			header = (
				<TableRow
					key={0}
					style={{height: '40px'}}
					selectable={false}
				>
					{headerNameLinks}
				</TableRow>
			);

			dataRows = this.props.csvData.map((rowData, rowIndex) => {
				let row = rowData.map((cell, colIndex) => {
					if (this.state.columnEnabled[colIndex] && !this.props.variableMetadata[colIndex].isTimeVar) {
						return(
							<TableRowColumn key={colIndex}>
								{cell}
							</TableRowColumn>
						);
					} else {
						return (
							<TableRowColumn
								key={colIndex}
								style={{backgroundColor: '#d3d3d3'}}
							>
								{cell}
							</TableRowColumn>
						);
					}
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

			for (let i = 0; i < this.props.csvData[0].length; i++) {
				modals.push(<VariablesModal
					open={this.state.modalOpenStates[i]}
					column={i}
					handleSave={(index, newData) => this.handleSaveVariable(index, newData)}
					requiredFields = {['units', 'name', 'long_name']}
					modalData={this.props.variableMetadata[i]}
					handleCancel={(index) => this.handleCancel(index)}
				/>);
			}
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
				{modals}
			</div>
		);
	}
}

export default VariablesCSVTable;
