import { Component } from 'react';
import IRocket from '../../services/model/rocket.type';
import rocketsDataService from '../../services/rockets.data.service';
import RocketsList from './rockets-list';
import RocketsSearch from './rockets-search';

type Props = {
};

type State = {
  searchText: string,
  rockets: Array<IRocket>
};

export default class RocketsMain extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.getRockets = this.getRockets.bind(this);

    this.state = {
      searchText: '',
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

  onChange(searchText: string) {
    this.setState({ searchText });
  }

  render() {
    const { rockets } = this.state;

    return (
      <div>
        <div>
          <RocketsSearch onChange={this.onChange.bind(this)} searchText={this.state.searchText} resultCount={rockets.length} />
        </div>
        <table>
          <thead>
            <tr>
              <th>Rocket name</th>
              <th>Diameter</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Cost per launch</th>
            </tr>
          </thead>
          <RocketsList />
        </table>
      </div>
    );
  }
}