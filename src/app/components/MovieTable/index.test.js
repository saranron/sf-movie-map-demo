import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';
import MovieTable from './index';

describe('<MovieTable />', () => {
  const wrapper = shallow(<MovieTable />);

  it('should render a Table', () => {
    expect(wrapper.find(Table)).toExist();
  });

  describe('getColumnsDefinition', () => {
    test('actor column renderer should render a list of actors', () => {
      const columnsDefinition = wrapper.instance().getColumnsDefinition();
      const actorColumn = columnsDefinition.find(definition => definition.dataIndex === 'actors');
      const text = 'text';
      const record = { actors: ['a', 'b', 'c'] };

      const columnWrapper = shallow(actorColumn.render(text, record));
      expect(columnWrapper.find('li').length).toBe(record.actors.length);
    });
  });

  describe('renderLocations', () => {
    it('should render a div with no data message', () => {
      const movie = { locations: [] };
      const actual = shallow(wrapper.instance().renderLocations(movie));

      expect(actual).toContainReact(<div>No location data</div>);
    });

    it('should render the location list items', () => {
      const movie = { locations: ['1', '2', '3', '4', '5'] };
      const actual = shallow(wrapper.instance().renderLocations(movie));

      expect(actual.find('li').length).toBe(movie.locations.length);
    });
  });
});
