import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';


const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

select.addEventListener('change', onSearch);

function onSearch(e) {
    const selectBreedId = e.target.value;

    loader.style.display = 'block';
    error.classList.add('hide');

    fetchCatByBreed(selectBreedId)
    .then((catData) => {

        loader.style.display = 'none';

    if (catData) {
        const catInfo = document.querySelector('.cat-info');

        catInfo.style.display = 'block';

        catInfo.innerHTML = `
            <img src='${catData[0].url}' alt='Cat Image'>
            <p>Breed Name:<span class='breed-name'>${catData[0].breeds[0].name}</span></p>
            <p>Description:<span class='description'>${catData[0].breeds[0].description}</span></p>
            <p>Temperament:<span class='temperament'>${catData[0].breeds[0].temperament}</span></p>
        `;
    } else {
        error.classList.remove('hide');
    };
    })
    .catch((error) => {
        console.error('Error fetching:', error);

        error.classList.remove('hide');
        loader.style.display = 'none';
    });
};

fetchBreeds()
    .then((breeds) => {
        loader.style.display = 'none';

        breeds.forEach((breed) => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            select.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching:', error);

        error.classList.remove('hide');
        loader.style.display = 'none';
});