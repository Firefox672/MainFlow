import React from 'react';
import { Card } from 'react-bootstrap';

const MovieCard = ({ movie, onClick }) => (
  <Card onClick={() => onClick(movie.id)} style={{ cursor: 'pointer' }}>
    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
    <Card.Body>
      <Card.Title>{movie.title}</Card.Title>
      <Card.Text>Rating: {movie.vote_average}</Card.Text>
    </Card.Body>
  </Card>
);

export default MovieCard;
