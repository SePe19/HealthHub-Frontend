import httpService from './httpService';

const fetchWorkouts = async () => {
    try {
        const response = await httpService.get('/workout/all');
        if (response && response.data) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        throw error;
    }
};

export default fetchWorkouts;
