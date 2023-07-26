const API_KEY = 'live_faod7F7iwdTeHxKxxNpPlufEV4OGiaHx2txyhON8I5XLJGky5rsULrQHLkTNt8ps';
const BASE_URL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });       
};

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });  
};