/**
 * @jest-environment jsdom
 */
import RocketsMain from './rockets-main';
import * as ReactDOM from 'react-dom';
import rocketsService from '../../services/rockets.service';
jest.mock('../../services/rockets.service');
import { fireEvent } from '@testing-library/react';
import IRocket from '../../data-services/model/rocket.type';
import rocketsDataService from '../../data-services/rockets.data.service';
import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Rockets main component', () => {
    const mockGetRockets = jest.spyOn(rocketsDataService, 'getAll');
    mockGetRockets.mockImplementationOnce(() => Promise.resolve({ data: [], status: 200, statusText: 'OK', headers: {}, config: {} }));

    let wrapper;
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<RocketsMain />, container);
        wrapper = shallow(<RocketsMain />);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    })

    it('Renders correctly initial document', () => {
        const table = container.querySelectorAll('table');
        const thead = container.querySelectorAll('thead');
        expect(table).toHaveLength(1);
        expect(thead).toHaveLength(1); 
        expect(mockGetRockets).toHaveBeenCalledTimes(1);
    });

    describe ('filterRocketsByName', () => {
        it('filterRocketsByName IS called when input is filled', async () => {
            const filterRocketsByName = jest.spyOn(rocketsService, 'filterRocketsByName');
            const inputs = container.querySelectorAll('input');
            const searchInput = inputs[0];
            const searchText = 'test';
            fireEvent.input(searchInput, {target: {value: searchText}});

            expect(filterRocketsByName).toHaveBeenCalledTimes(1);
            expect(filterRocketsByName).toHaveBeenCalledWith([], searchText);
        });

        it('filterRocketsByName IS NOT called when input is filled', async () => {
            const filterRocketsByName = jest.spyOn(rocketsService, 'filterRocketsByName');

            expect(filterRocketsByName).toHaveBeenCalledTimes(0);
        });
    })
    describe ('sortBy', () => {
        it('sortBy IS called when TH clicked', async () => {
            const filterRocketsByName = jest.spyOn(rocketsService, 'sortBy');
            const inputs = container.querySelectorAll('th');
            const th = inputs[0];
            fireEvent.click(th);
    
            expect(filterRocketsByName).toHaveBeenCalledTimes(1);
        });
    
        it('sortBy IS NOT called when TH is not clicked', async () => {
            const filterRocketsByName = jest.spyOn(rocketsService, 'sortBy');
    
            expect(filterRocketsByName).toHaveBeenCalledTimes(0);
        });
    })

})