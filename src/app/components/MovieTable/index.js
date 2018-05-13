import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import { MovieShape } from '../../shapes';
import './styles.css';

class MovieTable extends React.Component {
  getColumnsDefinition = () => ([{
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    className: 'movie-table-column--title',
  }, {
    title: 'Release Year',
    dataIndex: 'releaseYear',
    key: 'releaseYear',
    className: 'movie-table-column--year',
  }, {
    title: 'Director',
    dataIndex: 'director',
    key: 'director',
    className: 'movie-table-column--director',
  }]);

  selectRow = (record) => {
    this.props.onMovieSelectionChanged(record);
  };

  render() {
    return (
      <Table
        className={`movie-table ${this.props.className}`}
        rowKey="title"
        size="middle"
        pagination="top"
        loading={this.props.isLoading}
        dataSource={this.props.movies}
        columns={this.getColumnsDefinition()}
        onRow={record => ({
          onClick: () => {
            this.selectRow(record);
          },
        })}
      />
    );
  }
}

MovieTable.defaultProps = {
  className: '',
  isLoading: false,
  movies: [],
  onMovieSelectionChanged: () => {},
};

MovieTable.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  movies: PropTypes.arrayOf(MovieShape),
  onMovieSelectionChanged: PropTypes.func,
};

export default MovieTable;
