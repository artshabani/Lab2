import axios from 'axios';

const url = 'http://localhost:5000/api/movies'; 

const getMovies = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getMovies };