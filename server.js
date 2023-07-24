const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const TMDB_API_KEY = 'e6c9fd7a32e574e93a6aec79bbb9b0a1'; // Replace with your TMDb API key

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Search endpoint
app.get('/search', async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from TMDb API:', error.message);
    res.status(500).json({ error: 'Unable to fetch data. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
