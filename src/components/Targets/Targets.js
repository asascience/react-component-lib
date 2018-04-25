/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

class Targets extends Component {

  state = {
    logged: true,
  };

  handleChange = (event, logged) => {
    this.setState({
      logged: logged,
    });
  };

  render() {
    return (
      <div>
        <Card>
          <CardHeader subtitle="Supported Standards"
                      actAsExpander={false}
                      showExpandableButton={false}
          />
          <CardText expandable={false}>

            <RaisedButton label="Climate/Forecast (CF)"
                          backgroundColor='#f2f2f2'
                          style={{marginRight: 20}}
                          icon={<FontIcon className="muidocs-icon-custom-github" />}
            />

            <RaisedButton label="ACDD"
                          backgroundColor='#bfbfbf'
                          icon={<FontIcon className="muidocs-icon-custom-github" />}
            />
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Targets;
