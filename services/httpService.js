import axios from 'axios';
import Constants from 'expo-constants';

const { healthHubApiUrl } = Constants.expoConfig.extra;

console.log('API URL:', healthHubApiUrl);

axios.defaults.baseURL = healthHubApiUrl;

console.log(axios.defaults.baseURL);

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};

export default httpService;
