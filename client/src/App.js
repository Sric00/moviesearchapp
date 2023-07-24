import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const response = await axios.get(`http://localhost:5000/search?query=${query}`);
      setMovies(response.data.results);
      if (response.data.results.length === 0) {
        setError('No results found for the given query.');
      }
    } catch (error) {
      console.error('Error fetching data from the server:', error.message);
      setError('Unable to fetch data. Please try again later.');
    }
  };

  return (
    <div className="app">
      <h1>Movie Search Application</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a movie title..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>{movie.overview}</p>
              <p>Rating: {movie.vote_average}</p>
              {movie.poster_path && (
                <p>
                  <strong>Movie Poster:</strong>
                  <br />
                  <a
                    href={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Poster
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default App;
