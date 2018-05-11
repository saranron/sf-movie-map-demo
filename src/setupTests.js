import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

window.google = {
  maps: {
    Marker: class {
      setMap = jest.fn();
    },
    Geocoder: class {
      geocode = jest.fn();
    },
  },
};
