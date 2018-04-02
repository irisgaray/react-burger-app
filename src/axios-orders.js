import axios from 'axios';

// Database Connection URL
const instance = axios.create({
    baseURL: 'https://react-burger-app-6fdbd.firebaseio.com/'
});

export default instance;