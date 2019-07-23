import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
const mockGeolocation = {
    getCurrentPosition: jest.fn()
        .mockImplementation((success) => Promise.resolve(success({
            coords: {
                latitude: 41.486201,
                longitude: 2.0378555
            }
        })))
};

global.navigator = {};
global.navigator.geolocation = mockGeolocation;