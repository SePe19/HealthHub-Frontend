import httpService from './httpService';

const fetchWorkouts = async () => {
    try {
        console.log("HERROOOOO");
        const response = await httpService.get('/workout/all');
        console.log("RESPONSE:", response);
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
