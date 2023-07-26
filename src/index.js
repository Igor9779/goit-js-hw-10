import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', onSearch);

function showLoader() {
    loader.style.display = 'block';
    select.disabled = true; 
    error.classList.remove('show-error');
    catInfo.style.display = 'none';
}

function hideLoader() {
    loader.style.display = 'none';
    select.disabled = false;
}

function showError() {
    error.classList.add('show-error');
}

function hideError() {
    error.classList.remove('show-error');
}

function onSearch(e) {
    const selectBreedId = e.target.value;

    showLoader();
    hideError();
    catInfo.style.display = 'none';

    fetchCatByBreed(selectBreedId)
        .then((catData) => {
            hideLoader();

            if (catData && catData[0] && catData[0].url) {
                catInfo.style.display = 'block';

                catInfo.innerHTML = `
                    <img src='${catData[0].url}' alt='Cat Image'>
                    <p>Breed Name:<span class='breed-name'>${catData[0].breeds[0].name}</span></p>
                    <p>Description:<span class='description'>${catData[0].breeds[0].description}</span></p>
                    <p>Temperament:<span class='temperament'>${catData[0].breeds[0].temperament}</span></p>
                `;
            } else {
                showError();
            }
        })
        .catch((error) => {
            console.error('Error fetching cat data:', error);
            hideLoader();
            showError();
        });
};

fetchBreeds()
    .then((breeds) => {
        breeds.forEach((breed) => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.text = breed.name;
            select.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error fetching breeds:', error);
        showError();
    });

