import IRocket from "../data-services/model/rocket.type";
import { OrderType } from "./model/order.type";
import rocketsService from "./rockets.service";

const rockets: IRocket[] = [
    {
        id: 1,
        rocket_name: "test rocket",
        cost_per_launch: 1000,
        height: { meters: 10, feet: 3 },
        diameter: { meters: 10, feet: 3 },
        mass: { kg: 10, lb: 3 }
    },
    {
        id: 2,
        rocket_name: "just rocket",
        cost_per_launch: 2000,
        height: { meters: 20, feet: 3 },
        diameter: { meters: 20, feet: 3 },
        mass: { kg: 20, lb: 3 }
    }
];

describe('Rockets service', () => {
    describe('filterRocketsByName', () => {
        it('filterRocketsByName should return 2 results out of 2 if no searchText is passed', () => {
            const searchText = '';
            let result = rocketsService.filterRocketsByName(rockets, searchText);
            expect(result.length).toBe(2);
        });

        it('filterRocketsByName should return 1 result out of 2 with matching word passed', () => {
            const searchText = 'TeSt';
            let result = rocketsService.filterRocketsByName(rockets, searchText);
            expect(result.length).toBe(1);
        });

        it('filterRocketsByName should return 0 results out of 2 with NO matching word passed', () => {
            const searchText = 'NO';
            let result = rocketsService.filterRocketsByName(rockets, searchText);
            expect(result.length).toBe(0);
        });
    })

    describe('sortBy', () => {
        it('sortBy should order rocket_name alphabetically correct if order type is ASC', () => {
            let result = rocketsService.sortBy(rockets, 'rocket_name', OrderType.Asc);

            expect(result[0].rocket_name).toBe('just rocket');
            expect(result[1].rocket_name).toBe('test rocket');
        });

        it('sortBy should order rocket_name alphabetically correct if order type is DESC', () => {
            let result = rocketsService.sortBy(rockets, 'rocket_name', OrderType.Desc);

            expect(result[0].rocket_name).toBe('test rocket');
            expect(result[1].rocket_name).toBe('just rocket');
        });

        it('sortBy should order cost_per_launch numerically correct if order type is ASC', () => {
            let result = rocketsService.sortBy(rockets, 'cost_per_launch', OrderType.Asc);

            expect(result[0].cost_per_launch).toBe(1000);
            expect(result[1].cost_per_launch).toBe(2000);
        });

        
        it('sortBy should order cost_per_launch numerically correct if order type is DESC', () => {
            let result = rocketsService.sortBy(rockets, 'cost_per_launch', OrderType.Desc);

            expect(result[0].cost_per_launch).toBe(2000);
            expect(result[1].cost_per_launch).toBe(1000);
        });
    })

    describe('sortByLength', () => {
        it('sortBy should order height numerically correct if order type is ASC', () => {
            let result = rocketsService.sortByLength(rockets, 'height', OrderType.Asc);

            expect(result[0].height.meters).toBe(10);
            expect(result[1].height.meters).toBe(20);
        });

        
        it('sortBy should order height numerically correct if order type is DESC', () => {
            let result = rocketsService.sortByLength(rockets, 'height', OrderType.Desc);

            expect(result[0].height.meters).toBe(20);
            expect(result[1].height.meters).toBe(10);
        });

        it('sortBy should order diameter numerically correct if order type is ASC', () => {
            let result = rocketsService.sortByLength(rockets, 'diameter', OrderType.Asc);

            expect(result[0].diameter.meters).toBe(10);
            expect(result[1].diameter.meters).toBe(20);
        });

        
        it('sortBy should order diameter numerically correct if order type is DESC', () => {
            let result = rocketsService.sortByLength(rockets, 'diameter', OrderType.Desc);

            expect(result[0].diameter.meters).toBe(20);
            expect(result[1].diameter.meters).toBe(10);
        });
    })

    describe('sortByMass', () => {
        it('sortBy should order mass numerically correct if order type is ASC', () => {
            let result = rocketsService.sortByMass(rockets, 'mass', OrderType.Asc);

            expect(result[0].mass.kg).toBe(10);
            expect(result[1].mass.kg).toBe(20);
        });

        
        it('sortBy should order mass numerically correct if order type is DESC', () => {
            let result = rocketsService.sortByMass(rockets, 'mass', OrderType.Desc);

            expect(result[0].mass.kg).toBe(20);
            expect(result[1].mass.kg).toBe(10);
        });
    })
})