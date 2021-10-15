import { Component } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import IRocket from '../../data-services/model/rocket.type';
import { tableStyles } from './styles';

interface Props extends WithStylesProps<typeof tableStyles> {
  className?: string
  rockets: Array<IRocket>
};

interface State {
  rockets: Array<IRocket>
};

class RocketsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      rockets: []
    };
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.rockets !== this.props.rockets) {
      this.setState({ rockets: this.props.rockets });
    }
  }

  render() {
    const { classes } = this.props;
    const { rockets } = this.state;
    const priceRegex = /\B(?=(\d{3})+(?!\d))/g;


    return (
      <tbody>
        {rockets && rockets.map((rocket) => (
          <tr className={classes.tableRow} key={rocket.id}>
            <td className={classes.textValue}>{rocket.rocket_name}</td>
            <td className={classes.numericValue}>{rocket.diameter.meters}m</td>
            <td className={classes.numericValue}>{rocket.height.meters}m</td>
            <td className={classes.numericValue}>{rocket.mass.kg}kg</td>
            <td className={classes.numericValue}>${rocket.cost_per_launch.toString().replace(priceRegex, " ")}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}


export default withStyles(tableStyles)(RocketsList);