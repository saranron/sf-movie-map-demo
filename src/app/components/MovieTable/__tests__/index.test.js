import React from 'react';
import { shallow } from 'enzyme';
import { Table } from 'antd';
import MovieTable from '../index';

describe('<MovieTable />', () => {
  const props = {
    onMovieSelectionChanged: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MovieTable {...props} />);
  });

  afterEach(() => {
    props.onMovieSelectionChanged.mockReset();
  });

  it('should render a Table', () => {
    expect(wrapper.find(Table)).toExist();
  });

  it('should have 3 columns', () => {
    const columnsDefinition = wrapper.instance().getColumnsDefinition();

    expect(columnsDefinition).toHaveLength(3);
  });

  test('selectRow should invoke onMovieSelectionChanged', () => {
    const record = {};

    wrapper.instance().selectRow(record);

    expect(props.onMovieSelectionChanged).toHaveBeenCalledTimes(1);
    expect(props.onMovieSelectionChanged).toHaveBeenCalledWith(record);
  });

  it('should invoke selectRow on row clicked', () => {
    const record = {};
    wrapper.instance().selectRow = jest.fn();

    const tableWrapper = wrapper.find(Table);
    tableWrapper.props().onRow(record).onClick();

    expect(wrapper.instance().selectRow).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().selectRow).toHaveBeenCalledWith(record);
  });
});
