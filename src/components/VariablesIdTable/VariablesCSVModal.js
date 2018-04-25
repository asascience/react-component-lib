import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import standardNames from '../../helpers/autocomplete/StandardNameFiltered.js';
import clone from 'clone';

/**
 * Modal dialog component for editing the variable metadata from the VariablesCSVTable
 *
 * @prop {Object} metadata - the metadata object of the modal display
 */
class VariablesCSVModal extends Component {
	/**
	 * @param {Object} props.modalData - the original data passed in for the modal
	 * @param {number} props.column - the column index associated with the modal
	 * @param {boolean} props.open - whether the modal should be displayed
	 * @param {function} props.handleSave - callback for when the save button is pressed
	 * @param {function} props.handleCancel - callback for when the cancel button is pressed
	 */
	constructor(props) {
		super(props);

		let fields = clone(this.props.modalData);

		// Should reflect if any fields should display errors (if they are not filled.)
		let errorState = this.props.requiredFields.reduce((a, object, index, array)=>{
			if(fields[object] === undefined || fields[object] === ''){
				return a.concat(object);
			}
			return a;
		}, []);

		this.state = {
			fields: fields,
			errorState: errorState,
		}
		this.onTextChange = this.onTextChange.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.fieldHasError = this.fieldHasError.bind(this);



		this.errorText = "This field is required.";
	}

	fieldHasError(field){
		return this.state.errorState.indexOf(field) !== -1;
	}

	/**
	 * Controls when a text field is changed
	 */
	onTextChange(field, newValue) {
		let mutateState = Object.assign({}, this.state.fields);
		mutateState[field] = newValue;


		let mutateErrors = this.state.errorState.slice();

		// Check if the text change should trigger an error.
		if(newValue === '' && this.props.requiredFields.indexOf(field) !== -1){
			if(this.state.errorState.indexOf(field) === -1)mutateErrors.push(field);
		}else{
			// If there is not error filter out the field from the error array.
			mutateErrors = mutateErrors.filter((object)=>{
				return object !== field;
			});
		}

		this.setState({
			fields: mutateState,
			errorState: mutateErrors,
		});
	}

	/**
	 * Resets the metadata when the cancel button is pressed
	 */
	handleCancel() {
		this.setState({
			metadata: clone(this.props.modalData),
		});
		this.props.handleCancel(this.props.column);
	}

	render() {
		let buttons = [
			<RaisedButton
				label='Cancel'
				primary={true}
				style={{marginRight: '10px'}}
				onTouchTap={(e) => this.handleCancel()}
			/>,
			<RaisedButton
				label='Save'
				primary={true}
				onTouchTap={(e) => this.props.handleSave(this.props.column, this.state.fields)}
			/>,
		];

		let content = (
			<table style={{width: '90%'}}>
			<tbody>
				<tr>
					<td>
					<TextField
						hintText='Name'
						value={this.state.fields.name}
						errorText={this.fieldHasError('name') ? this.errorText : ''}
						onChange={(e, newValue) => this.onTextChange('name', newValue)}
					/>
					</td>
					<td>
					<TextField
						hintText='Fill Value'
						value={this.state.fields.fill_value}
						errorText={this.fieldHasError('fill_value') ? this.errorText : ''}
						onChange={(e, newValue) => this.onTextChange('fill_value', newValue)}
					/>
					</td>
				</tr>
				<tr>
					<td>
					<AutoComplete
						hintText='Standard Name'
						value={this.state.fields.standard_name}
						errorText={this.fieldHasError('standard_name') ? this.errorText : ''}
						searchText={this.state.fields.standard_name}
						dataSource={standardNames}
						maxSearchResults={8}
						listStyle={{width: '500px'}}
						onUpdateInput={(newValue, i) => this.onTextChange('standard_name', newValue)}
						onNewRequest={(chosenValue, i) => this.onTextChange('standard_name', chosenValue)}
					/>
					</td>
					<td>
					<TextField
						hintText='Units'
						value={this.state.fields.units}
						errorText={this.fieldHasError('units') ? this.errorText : ''}
						onChange={(e, newValue) => this.onTextChange('units', newValue)}
					/>
					</td>
				</tr>
				<tr>
					<td>
					<TextField
						hintText='Long Name'
						value={this.state.fields.long_name}
						errorText={this.fieldHasError('long_name') ? this.errorText : ''}
						onChange={(e, newValue) => this.onTextChange('long_name', newValue)}
					/>
					</td>
					<td>
					<TextField
						hintText='Comment'
						value={this.state.fields.comment}
						errorText={this.fieldHasError('comment') ? this.errorText : ''}
						onChange={(e, newValue) => this.onTextChange('comment', newValue)}
						multiLine={true}
					/>
					</td>
				</tr>
				<tr>
					<td>
						<TextField
						hintText='Short Name'
						value={this.state.fields.short_name}
						errorText={this.fieldHasError('short_name') ? this.errorText : ''}
						onChange={(e, newValue) => this.onTextChange('short_name', newValue)}
					/>
					</td>
				</tr>
			</tbody>
			</table>
		);

		return (
			<div>
				<Dialog
					title={'Edit Variable'}
					actions={buttons}
					modal={true}
					open={this.props.open}
				>
					{content}
				</Dialog>
			</div>
		);
	}
}

export default VariablesCSVModal;
