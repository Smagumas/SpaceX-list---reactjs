import { Component } from 'react';
import IRocket from '../../data-services/model/rocket.type';
import rocketsDataService from '../../data-services/rockets.data.service';
import { OrderType } from '../../services/model/order.type';
import IRocketSortState from '../../services/model/rocket.sort-state.type';
import { RocketSortTypes } from '../../services/model/rocket.sort.type';
import rocketsService from '../../services/rockets.service';
import RocketsList from './rockets-list';
import RocketsSearch from './rockets-search';

type Props = {
};

type State = {
  searchText: string,
  rockets: Array<IRocket>,
  filteredRockets: Array<IRocket>
};

export default class RocketsMain extends Component<Props, State> {

  sortState: IRocketSortState;

  constructor(props: Props) {
    super(props);
    this.getRockets = this.getRockets.bind(this);

    this.state = {
      searchText: '',
      rockets: [],
      filteredRockets: []
    };

    this.sortState = {
      column: 'cost_per_launch',
      order: OrderType.Asc
    }
  }

  componentDidMount(): void {
    this.getRockets();
  }

  getRockets(): void {
    rocketsDataService.getAll().then((response) => {
      this.setState({
        rockets: response.data,
        filteredRockets: response.data
      })
    })
  }

  onChange(searchText: string): void {
    this.setState({ searchText });
    this.setState({ filteredRockets: rocketsService.filterRocketsByName(this.state.rockets, searchText) });
    // TODO persist sort state?
  }

  onSortClick(key: RocketSortTypes): void {
    this.setSortState(key);
    this.setState({ filteredRockets: rocketsService.sortBy(this.state.filteredRockets, key, this.sortState.order) });
  }

  onSortLengthClick(key: RocketSortTypes): void {
    this.setSortState(key);
    this.setState({ filteredRockets: rocketsService.sortByLength(this.state.filteredRockets, key, this.sortState.order) });
  }

  onSortMassClick(key: RocketSortTypes): void {
    this.setSortState(key);
    this.setState({ filteredRockets: rocketsService.sortByMass(this.state.filteredRockets, key, this.sortState.order) });
  }

  render() {
    return (
      <div>
        <div>
          <RocketsSearch onChange={this.onChange.bind(this)} searchText={this.state.searchText} resultCount={this.state.filteredRockets.length} />
        </div>
        <table>
          <thead>
            <tr>
              <th onClick={() => this.onSortClick('rocket_name')}>Rocket name</th>
              <th onClick={() => this.onSortLengthClick('diameter')}>Diameter</th>
              <th onClick={() => this.onSortLengthClick('height')}>Height</th>
              <th onClick={() => this.onSortMassClick('mass')}>Mass</th>
              <th onClick={() => this.onSortClick('cost_per_launch')}>Cost per launch</th>
            </tr>
          </thead>
          <RocketsList rockets={this.state.filteredRockets} />
        </table>
      </div>
    );
  }

  private setSortState(key: RocketSortTypes): void {
    let orderType = OrderType.Asc;
    if (this.sortState.column === key) {
      this.sortState.order = this.sortState.order === OrderType.Asc ? OrderType.Desc : OrderType.Asc;
    } else {
      this.sortState = {
        column: key,
        order: orderType
      }
    }
  }
}