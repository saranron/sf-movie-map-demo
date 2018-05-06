import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

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
    title: 'Production Company',
    dataIndex: 'productionCompany',
    key: 'productionCompany',
    className: 'movie-table-column--company',
  }, {
    title: 'Director',
    dataIndex: 'director',
    key: 'director',
    className: 'movie-table-column--director',
  }, {
    title: 'Actors',
    key: 'actors',
    dataIndex: 'actors',
    className: 'movie-table-column--actors',
    render: (text, record) => (
      <ul>
        {
          record.actors.map(actor => (<li key={actor}>{actor}</li>))
        }
      </ul>
    ),
  }]);

  renderLocations = movie => (
    movie.locations.length === 0 ?
      <div>No location data</div> :
      <ul>
        {
          movie.locations.map(location => (
            <li key={location}>{location}</li>
          ))
        }
      </ul>
  );

  render() {
    return (
      <Table
        className={`movie-table ${this.props.className}`}
        rowKey="title"
        loading={this.props.isLoading}
        dataSource={this.props.movies}
        columns={this.getColumnsDefinition()}
        expandRowByClick
        expandedRowRender={this.renderLocations}
      />
    );
  }
}

MovieTable.defaultProps = {
  className: '',
  isLoading: false,
  movies: [],
};

MovieTable.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  movies: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.required,
    director: PropTypes.string,
    releaseYear: PropTypes.string,
    productionCompany: PropTypes.string,
    locations: PropTypes.arrayOf(PropTypes.string),
    actors: PropTypes.arrayOf(PropTypes.string),
  })),
};

export default MovieTable;
