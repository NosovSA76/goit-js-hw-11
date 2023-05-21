export { refs }

//import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import FotoService from './js/fetchFoto';
// import  murkupGallery from './js/markupGallery';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery')
}
var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, showCounter: false });

const fotoService = new FotoService();

console.log(fotoService);

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  fotoService.query = e.currentTarget.elements.searchQuery.value;
  fotoService.resetPage();
  fotoService.fetchFoto().then(hits => murkupGallery(hits));
}

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

function clearGallery() {
  refs.gallery.innerHTML = "";
}

window.addEventListener('scroll', debounce(() => {
  const documentRect = document.documentElement.getBoundingClientRect()
  console.log(documentRect.bottom, documentRect.height)
  const mid = document.documentElement.clientHeight
  console.log(mid)
  if (documentRect.bottom < mid + 500) {
  fotoService.fetchFoto().then(hits => murkupGallery(hits));
  }
}, 200))