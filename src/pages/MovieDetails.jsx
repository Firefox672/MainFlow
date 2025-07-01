// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../api';
import { Container, Row, Col, Spinner, Badge, Button } from 'react-bootstrap';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetails = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    loadDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Link to="/" className="btn btn-secondary mb-3">← Back to Home</Link>
      <Row>
        <Col md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded"
          />
        </Col>
        <Col md={8}>
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
          <div className="mb-2">
            {movie.genres.map((genre) => (
              <Badge key={genre.id} bg="info" className="me-2">{genre.name}</Badge>
            ))}
          </div>
          <p>{movie.overview}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetails;
