import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import history from '../../history';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class DialogModal extends Component {
  /**
   * @param {Object} props - Props to be passed into this component
   * @param {string} props.title - the title of the dialog box
   * @param {string} props.heading - the bold heading over the content
   * @param {boolean} props.open - whether the dialog is open
   * @param {string|string[]} props.content - either the content text or an array of content links
   * @param {Object} props.uploadResponse - the response from a failed upload
   */
  constructor(props) {
    super(props);

    this.state = {
      open: true,
    };

    this.handleClose = this.handleClose.bind(this);
  }


  /**
   * Handles the closing of the modal view on selecting the OK button
   */
  handleClose() {
    this.setState({open: false});
    if (this.props.hasOwnProperty('reroute')) {
      history.push('/');
    }

    if (this.props.hasOwnProperty('onRequestClose')) {
      this.props.onRequestClose && this.props.onRequestClose();
    }
  };

  render() {
    let actions = [
      <RaisedButton
        label="Ok"
        backgroundColor="#e6e6e6"
        onClick={this.handleClose}
        style={{marginRight: 20}}
      />,
    ];
    let content;
    if (Array.isArray(this.props.content)) {
      let links = this.props.content.map((obj, ind)=>{
        let link = obj.link;
        let title = obj.title;
        return (<li key={ind} display='block'>
                  <a href={link}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{color: '#0645AD'}}
                  >{title}</a>
                </li>);
      });
      content = (<ul style={{listStyle: 'none'}}>
        {links}
      </ul>);
    } else if (this.props.content && this.props.content.FTPCredentials === true) {
      content = <p><b>Username:</b> {this.props.content.username}
            <br /> <b>Password:</b> {this.props.content.password}
            <br /> <b>URL:</b> {this.props.content.url}
                </p>;
    } else if (this.props.duplicateUpload === true) {
      // encapsulate dataset ID in an object to match getAutocompleteDataset function definition in GenericUploadPage.js
      let dataset = Object;
      dataset.id = this.props.uploadResponse.datasets[0];

      actions.push(<RaisedButton
                      label="Go To Dataset"
                      backgroundColor="#1D8BDD"
                      onClick={(e) => {e.preventDefault(); this.props.parentContext.getAutocompleteDataset(dataset);}}
                    />);
      content = this.props.content;
    }
    else {
      content = <p>{this.props.content}</p>;
    }
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
        <p><b>{this.props.heading}</b></p>
        {content}
        </Dialog>
      </div>
    );
  }
}

DialogModal.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  open: PropTypes.bool,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
  ]),
  uploadResponse: PropTypes.object,
}

export default DialogModal;
