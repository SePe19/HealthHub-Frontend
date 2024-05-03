import axios from 'axios';

axios.defaults.baseURL = process.env.HEALTH_HUB_API_URL;

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;