export { refs }

//import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import FotoService from './js/fetchFoto';
<<<<<<< Updated upstream
// import  murkupGallery from './js/markupGallery';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery')
}
var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, showCounter: false });

const fotoService = new FotoService();

console.log(fotoService);
=======
import { refs } from './js/refs.js'
import { murkupGallery } from './js/markupGallery';
// import { addMoreFoto } from './js/addMoreFoto';


var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const fotoService = new FotoService();

>>>>>>> Stashed changes

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  clearGallery();
  fotoService.query = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  fotoService.resetPage();

  try {
    const { hits, total } = await fotoService.fetchFoto();
    const murkup = murkupGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', murkup);
    lightbox.refresh();
    if(total > 0){
      Notify.success(`Hooray! We found ${total} images. But we can show only 520`);
    }
    else {
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');

    }
  } catch (error) {
    Notify.failure('Something went wrong!');
  }
}

<<<<<<< Updated upstream
const murkupGallery = (hits) => {
  const imagesMarkup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
   <a href="${largeImageURL}" target="_blank" class="gallery-item">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
</a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes} </b>
    </p>
    <p class="info-item">
      <b>Views ${views} </b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`
  ).join('');

  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
  lightbox.refresh()
}

=======
>>>>>>> Stashed changes
function clearGallery() {
  refs.gallery.innerHTML = "";
}

<<<<<<< Updated upstream
window.addEventListener('scroll', debounce(() => {
  const documentRect = document.documentElement.getBoundingClientRect()
  console.log(documentRect.bottom, documentRect.height)
  const mid = document.documentElement.clientHeight
  console.log(mid)
=======

const debouncedAddMoreFoto = debounce(addMoreFoto, 500);

async function addMoreFoto() {
  const documentRect = document.documentElement.getBoundingClientRect();
  const mid = document.documentElement.clientHeight;

>>>>>>> Stashed changes
  if (documentRect.bottom < mid + 500) {
    try {
     const { hits } = await fotoService.fetchFoto();
    const murkup = murkupGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', murkup);
    lightbox.refresh();
    } catch (error) {
       Notify.failure('We are sorry, but you have reached the end of search results.');
    }
  }
}

window.addEventListener('scroll', debouncedAddMoreFoto);