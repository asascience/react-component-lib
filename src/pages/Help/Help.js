import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './Help.css';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6bc4ea',  // Light Blue
    primary2Color: '#987d69',  // Brown
    accent1Color: '#323c19',  // Dark Green
    pickerHeaderColor: '#eb3e3c',  // Red
  },
});


class Help extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="help">
            <h1>Help</h1>
            <h3>Getting Started</h3>
            <p>Start by selecting which kind of dataset you wish to upload on the home page.</p>
            <img src="https://user-images.githubusercontent.com/20936453/29288261-1aa57514-8106-11e7-8ad4-84feb95d56cf.png" alt=""/>
            <p> Let's walk through the Gridded Model Upload workflow. If you selected the Gridded Model option,
            you should be redirected to the Gridded Model upload page. From here you can search for an existing dataset,
            drag and drop your own dataset or select one from the file system by clicking within the grey box at the bottom
            of the page.</p>
            <img src="https://user-images.githubusercontent.com/20936453/29288573-3ae20274-8107-11e7-9ca2-c1f4b70ca0a5.png" alt=""/>
            <p>If the dataset upload or selection was sucessful, you should be redirected to the first of four editing pages--the
            four being General, Attribution, Data Extents and Variables. Here is an example:</p>
            <img src="https://user-images.githubusercontent.com/20936453/29288777-0cf3da6c-8108-11e7-8961-017cfae05690.png" alt=""/>
            <p>When you are finished editing your data, you should navigate to the summary page. This page will allow
            you to review the changes you have made and to submit the dataset using the submit button in the bottom
            right corner.</p>
            <img src="https://user-images.githubusercontent.com/20936453/29288842-5bc1a110-8108-11e7-8067-cba2ab50c4fb.png" alt=""/>
            <h3>Handling CSV Files</h3>
            <p>While uploading Point Timeseries and Survey data is very similar to Gridded Model, both allow for uploading CSV
            files, which presents a different interface. For example, if you choose to upload a Point Timeseries with
            CSV, you will be prompted to edit the Variable identification field in addition to the standard fields.
            Here is an example: </p>
            <img src="https://user-images.githubusercontent.com/20936453/29290022-a433b57e-810c-11e7-9526-a2fb606e06f1.png" alt=""/>
            <p>When uploading Survey Data, You will be prompted to select the correct columns for parsing the CSV file: </p>
            <img src="https://user-images.githubusercontent.com/20936453/29289481-9e83e88a-810a-11e7-9578-d15e1c9afa16.png" alt=""/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Help;