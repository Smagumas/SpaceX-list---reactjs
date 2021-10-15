import { Component } from 'react';
import IRocket from '../../data-services/model/rocket.type';
import rocketsDataService from '../../data-services/rockets.data.service';
import { OrderType } from '../../services/model/order.type';
import IRocketSortState from '../../services/model/rocket.sort-state.type';
import { RocketBasicSortTypes, RocketLengthSortTypes, RocketMassSortTypes, RocketSortTypes } from '../../services/model/rocket.sort.type';
import rocketsService from '../../services/rockets.service';
import RocketsList from './rockets-list';
import RocketsSearch from './rockets-search';
import RocketsHeader from './rockets-header';
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

export class RocketsMain extends Component<Props, State> {
  sortState: IRocketSortState;

  constructor(props: Props) {
    super(props);

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
  }

  onSortClick(key: RocketBasicSortTypes, order: OrderType): void {
    this.setState({ filteredRockets: rocketsService.sortBy(this.state.filteredRockets, key, order) });
  }

  onSortLengthClick(key: RocketLengthSortTypes, order: OrderType): void {
    this.setState({ filteredRockets: rocketsService.sortByLength(this.state.filteredRockets, key, order) });
  }

  onSortMassClick(key: RocketMassSortTypes, order: OrderType): void {
    this.setState({ filteredRockets: rocketsService.sortByMass(this.state.filteredRockets, key, order) });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mainContainer}>
        <RocketsSearch onChange={this.onChange.bind(this)} searchText={this.state.searchText} resultCount={this.state.filteredRockets?.length} />
        <table className={classes.table}>
          <RocketsHeader
            onSortClick={this.onSortClick.bind(this)}
            onSortLengthClick={this.onSortLengthClick.bind(this)}
            onSortMassClick={this.onSortMassClick.bind(this)} />
          <RocketsList classes={classes} rockets={this.state.filteredRockets} />
        </table>
      </div>
    );
  }
}

export default withStyles(tableStyles)(RocketsMain);