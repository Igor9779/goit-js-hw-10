import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';


const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.classList.replace('loader', 'is-hidden');
error.classList.add('is-hidden');
catInfo.classList.add('is-hidden');

let breedsIdArr = [];
fetchBreeds()
.then(data => {
    data.forEach(item => {
        breedsIdArr.push({text: item.name, value: item.id});
    });
    new SlimSelect({
        select,
        data: breedsIdArr,
    });
    })
.catch(onFetchError);

select.addEventListener('change', onSelectBreed);

function onSelectBreed(e) {
    loader.classList.replace('is-hidden', 'loader');
    select.classList.add('is-hidden');
    catInfo.classList.add('is-hidden');

    const breedId = e.currentTarget.value;
    fetchCatByBreed(breedId)
    .then(data => {
        loader.classList.replace('loader', 'is-hidden');
        select.classList.remove('is-hidden');
        const { url, breeds } = data[0];
        
        catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
        catInfo.classList.remove('is-hidden');
    })
    .catch(onFetchError);
};

function onFetchError(error) {
    select.classList.remove('is-hidden');
    loader.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page or select another cat breed!', {
        position: 'center-center',
        timeout: 5000,
        width: '400px',
        fontSize: '24px'
    });
};