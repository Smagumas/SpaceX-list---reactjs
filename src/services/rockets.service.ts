import ILength from "../data-services/model/length.type";
import IMass from "../data-services/model/mass.type";
import IRocket from "../data-services/model/rocket.type";
import { RocketSortTypes } from "./model/rocket.sort.type";

type sortTypes = 'cost_per_launch' | 'height' | 'diameter' | 'mass' | 'rocket_name';

class RocketsService {
  filterRocketsByName(rockets: IRocket[], searchText: string): IRocket[] {
    return rockets.filter((rocket) => {
      return rocket.rocket_name.toUpperCase().search(searchText.toUpperCase()) > -1;
    })
  }

  sortBy(rockets: IRocket[], key: RocketSortTypes): IRocket[] {
    return rockets.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
  }

  sortByLength(rockets: IRocket[], key: RocketSortTypes): IRocket[] {
    return rockets.sort((a,b) => {
      const sortA = (a[key] as ILength).meters;
      const sortB = (b[key] as ILength).meters;
      return (sortA > sortB) ? 1 : ((sortB > sortA) ? -1 : 0);
    });
  }

  sortByMass(rockets: IRocket[], key: RocketSortTypes): IRocket[] {
    return rockets.sort((a,b) => {
      const sortA = (a[key] as IMass).kg;
      const sortB = (b[key] as IMass).kg;
      return (sortA > sortB) ? 1 : ((sortB > sortA) ? -1 : 0);
    });
  }
}

export default new RocketsService();