import * as React from 'react';
import RocketsList from './rockets-list';
import RocketsSearch from './rockets-search';

class RocketsMain extends React.Component {

    render() {
      return (
        <div>
          <div>
            <RocketsSearch />
          </div>

          <div>
            <RocketsList />
          </div>
        </div>
      );
    }
  }
  
  
  export default RocketsMain;