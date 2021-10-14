import ILength from "./length.type";
import IMass from "./mass.type";

export default interface IRocket {
    id: number,
    cost_per_launch: number,
    height: ILength,
    diameter: ILength,
    mass: IMass
    rocket_name: string
}