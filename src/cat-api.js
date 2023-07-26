import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = 'live_faod7F7iwdTeHxKxxNpPlufEV4OGiaHx2txyhON8I5XLJGky5rsULrQHLkTNt8ps';

const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/breeds`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.error('Error fetching:', error);
    return [];
    });
};

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
    .then((response) => {
    return response.data;
    })
    .catch((error) => {
        console.error('Error fetching:', error);
    return null;
    });
};