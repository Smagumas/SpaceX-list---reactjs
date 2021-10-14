import { OrderType } from "./order.type";
import { RocketSortTypes } from "./rocket.sort.type";

export default interface IRocketSortState {
    column: RocketSortTypes,
    order: OrderType 
}