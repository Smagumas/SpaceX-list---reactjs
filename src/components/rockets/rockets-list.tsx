import { Component } from 'react';
import IRocket from '../../data-services/model/rocket.type';

type Props = {
  rockets: Array<IRocket>
};

type State = {
  rockets: Array<IRocket>
};

export default class RocketsList extends Component<Props, State> {
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
    const { rockets } = this.state;

    return (
      <tbody>
        {rockets && rockets.map((rocket) => (
          <tr key={rocket.id}>
            <td>{rocket.rocket_name}</td>
            <td>{rocket.diameter.meters}m</td>
            <td>{rocket.height.meters}m</td>
            <td>{rocket.mass.kg}kg</td>
            <td>${rocket.cost_per_launch}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}
