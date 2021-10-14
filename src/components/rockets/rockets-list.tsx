import { Component } from 'react';
import IRocket from '../../services/model/rocket.type';
import rocketsDataService from '../../services/rockets.data.service';

type Props = {};

type State = {
  rockets: Array<IRocket>
};

export default class RocketsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getRockets = this.getRockets.bind(this);

    this.state = {
      rockets: []
    };
  }

  componentDidMount() {
    this.getRockets();
  }

  getRockets() {
    rocketsDataService.getAll().then((response) => {
      this.setState({
        rockets: response.data
      })
    })
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
