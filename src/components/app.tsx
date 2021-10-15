import { Component } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import RocketsMain from './rockets/rockets-main';
import '../assets/styles.css';

const styles = {
  mainContainer: {
    backgroundColor: '#f5f5f6',
    display: 'flex',
    margin: [[20, 30]]
  }
};

interface Props extends WithStylesProps<typeof styles> {
  className?: string,
}

interface State {
}

class App extends Component<Props, State> {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <RocketsMain />
      </div>
    );
  }
}


export default withStyles(styles)(App);