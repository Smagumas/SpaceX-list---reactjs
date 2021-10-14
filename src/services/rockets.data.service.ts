import { AxiosResponse } from 'axios';
import http from '../utils/http-common';
import IRocket from './model/rocket.type';

class RocketsDataService {
  getAll(): Promise<AxiosResponse<IRocket[]>> {
    return http.get("rockets");
  }
}

export default new RocketsDataService();