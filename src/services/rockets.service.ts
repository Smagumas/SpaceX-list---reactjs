import ILength from "../data-services/model/length.type";
import IMass from "../data-services/model/mass.type";
import IRocket from "../data-services/model/rocket.type";
import Utils from "../utils/utils";
import { OrderType } from "./model/order.type";
import { RocketSortTypes } from "./model/rocket.sort.type";

class RocketsService {
  filterRocketsByName(rockets: IRocket[], searchText: string): IRocket[] {
    return rockets.filter((rocket) => {
      return rocket.rocket_name.toUpperCase().search(searchText.toUpperCase()) > -1;
    })
  }

  sortBy(rockets: IRocket[], key: RocketSortTypes, order: OrderType): IRocket[] {
    if (order === OrderType.Asc) {
      return rockets.sort((a,b) => Utils.sortAsc(a[key], b[key]));
    } else {
      return rockets.sort((a,b) => Utils.sortDesc(a[key], b[key]));
    }
  }

  sortByLength(rockets: IRocket[], key: RocketSortTypes, order: OrderType): IRocket[] {
    return rockets.sort((a,b) => {
      const sortA = (a[key] as ILength).meters;
      const sortB = (b[key] as ILength).meters;
      if (order === OrderType.Asc) {
        return Utils.sortAsc(sortA, sortB);
      } else {
        return Utils.sortDesc(sortA, sortB);
      }
    });
  }

  sortByMass(rockets: IRocket[], key: RocketSortTypes, order: OrderType): IRocket[] {
    return rockets.sort((a,b) => {
      const sortA = (a[key] as IMass).kg;
      const sortB = (b[key] as IMass).kg;
      if (order === OrderType.Asc) {
        return Utils.sortAsc(sortA, sortB);
      } else {
        return Utils.sortDesc(sortA, sortB);
      }
    });
  }
}

export default new RocketsService();