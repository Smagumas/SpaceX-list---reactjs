import { ChangeEvent, Component } from 'react';
import withStyles, { WithStylesProps } from 'react-jss';
import { stylesSearch } from './styles';


interface Props extends WithStylesProps<typeof stylesSearch> {
  resultCount: number,
  searchText: string,
  onChange(searchText: string): void,
  className?: string
};

interface State {
  resultCount: number,
  searchText: string
};

class RocketsSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeSearchText = this.onChangeSearchText.bind(this);

    this.state = {
      resultCount: props.resultCount,
      searchText: ''
    };
  }

  componentDidUpdate(prevProps: Props): void {
    if (prevProps.resultCount !== this.props.resultCount) {
      this.setState({ resultCount: this.props.resultCount });
    }
  }

  onChangeSearchText(e: ChangeEvent<HTMLInputElement>): void {
    const searchText = e.target.value;
    this.props.onChange(searchText);
    this.setState({ searchText });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.mainContainer}>
        <div className={classes.title}>SpaceX rockets</div>
        <div className={classes.count}>{this.state.resultCount} Results</div>
        <label className={classes.searchContainer}>
          <input className={classes.searchInput} onChange={this.onChangeSearchText} placeholder="Search" />
        </label>
      </div>
    );
  }
};

export default withStyles(stylesSearch)(RocketsSearch);