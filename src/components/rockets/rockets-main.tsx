import { Component } from 'react';
import IRocket from '../../data-services/model/rocket.type';
import rocketsDataService from '../../data-services/rockets.data.service';
import { OrderType } from '../../services/model/order.type';
import IRocketSortState from '../../services/model/rocket.sort-state.type';
import { RocketSortTypes } from '../../services/model/rocket.sort.type';
import rocketsService from '../../services/rockets.service';
import RocketsList from './rockets-list';
import RocketsSearch from './rockets-search';
import withStyles, { WithStylesProps } from 'react-jss';
import { tableStyles } from './styles';

interface Props extends WithStylesProps<typeof tableStyles> {
  className?: string
};

interface State {
  searchText: string,
  rockets: Array<IRocket>,
  filteredRockets: Array<IRocket>
};

class RocketsMain extends Component<Props, State> {
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
      column: 'rocket_name',
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

  getSortOrder(key: RocketSortTypes): string {
    const { classes, className } = this.props;

    if (this.sortState.column === key) {
      return this.sortState.order === OrderType.Asc ? classes.asc : classes.desc;
    } else {
      return '';
    }
  }

  render() {
    const { classes, className } = this.props;

    return (
      <div className={classes.mainContainer}>
        <RocketsSearch onChange={this.onChange.bind(this)} searchText={this.state.searchText} resultCount={this.state.filteredRockets.length} />
        <table className={classes.table}>
          <thead className={classes.tableHeader}>
            <tr>
              <th className={`${classes.textValue} ${this.getSortOrder('rocket_name')}`} onClick={() => this.onSortClick('rocket_name')}>
                Rocket name
              </th>
              <th className={`${classes.numericValue} ${this.getSortOrder('diameter')}`} onClick={() => this.onSortLengthClick('diameter')}>
                Diameter
              </th>
              <th className={`${classes.numericValue} ${this.getSortOrder('height')}`} onClick={() => this.onSortLengthClick('height')}>
                Height
              </th>
              <th className={`${classes.numericValue} ${this.getSortOrder('mass')}`} onClick={() => this.onSortMassClick('mass')}>
                Mass
              </th>
              <th className={`${classes.numericValue} ${this.getSortOrder('cost_per_launch')}`} onClick={() => this.onSortClick('cost_per_launch')}>
                Cost per launch
              </th>
            </tr>
          </thead>
          <RocketsList classes={classes} rockets={this.state.filteredRockets} />
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

export default withStyles(tableStyles)(RocketsMain);