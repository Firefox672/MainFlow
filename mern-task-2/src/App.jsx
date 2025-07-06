import { fetchPopularMovies, searchMovies, discoverMovies } from './api';

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import { fetchPopularMovies, searchMovies } from './api';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MovieDetails from './pages/MovieDetails';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({ genre: '', year: '', sort: 'popularity.desc' });
  const navigate = useNavigate();

  const loadPopular = async () => {
    const data = await fetchPopularMovies();
    setMovies(data.results);
  };

  const handleSearch = async (query) => {
    const data = await searchMovies(query);
    setMovies(data.results);
  };

  useEffect(() => {
  const loadMovies = async () => {
    const data = await discoverMovies(filters);
    setMovies(data.results);
  };
  loadMovies();
}, [filters]);


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    // (Optional) Trigger custom fetch here based on filters
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container>
            <h1 className="my-4 text-center">🎬 Movie App</h1>
            <SearchBar onSearch={handleSearch} />
            <FilterBar onFilterChange={handleFilterChange} />
            <Row>
              {movies.map((movie) => (
                <Col md={4} lg={3} key={movie.id} className="mb-4">
                  <MovieCard movie={movie} onClick={handleCardClick} />
                </Col>
              ))}
            </Row>
          </Container>
        }
      />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
