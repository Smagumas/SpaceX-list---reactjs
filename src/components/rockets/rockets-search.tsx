import { ChangeEvent, Component, Dispatch } from 'react';
import { connect } from 'react-redux'

type Props = { 
  resultCount: number,
  searchText: string,
  onChange(searchText: string): void
};

type State = {
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

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resultCount !== this.props.resultCount) {
      this.setState({resultCount: this.props.resultCount});
    }
  }

  onChangeSearchText(e: ChangeEvent<HTMLInputElement>) {
    const searchText = e.target.value;
    this.props.onChange(searchText);
    this.setState({searchText});
  }
 
  render() {
    return (
      <div>
        SpaceX rockets <span>{this.state.resultCount}</span> <input onChange={this.onChangeSearchText} />
      </div>
    );
  }
};

export default RocketsSearch;