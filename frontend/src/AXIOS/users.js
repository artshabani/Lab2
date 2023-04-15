import axios from 'axios';

const url = 'http://localhost:5000/api/users'; 

const getUsers = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { getUsers };
