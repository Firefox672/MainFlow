// src/components/FilterBar.jsx
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <Form className="mb-4">
      <Row className="g-3">
        <Col md={4}>
          <Form.Select name="genre" onChange={handleChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select name="year" onChange={handleChange}>
            <option value="">All Years</option>
            {Array.from({ length: 24 }, (_, i) => 2024 - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select name="sort" onChange={handleChange}>
            <option value="popularity.desc">Sort by Popularity</option>
            <option value="release_date.desc">Sort by Release Date</option>
            <option value="vote_average.desc">Sort by Rating</option>
          </Form.Select>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterBar;
