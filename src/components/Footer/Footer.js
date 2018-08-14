import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    }

    this.onSelectItem = this.onSelectItem.bind(this);
  }

  onSelectItem(index) {
    this.setState({
      selectedIndex: index,
    });
  }

  render() {
    const navbarStyle = {
      borderRadius: '4px',
    };

    let navItems = this.props.footerItems.map((item, k) => {
      let icon = <FontIcon className="material-icons">{item.iconName}</FontIcon>;

      return (
        <BottomNavigationItem
          label={item.label}
          icon={icon}
          onClick={() => this.onSelectItem(k)}
        />
      );
    });

    return (
      <Paper zDepth={1} style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <BottomNavigation
          selectedIndex={this.state.selectedIndex}
        >
          {navItems}
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Footer;