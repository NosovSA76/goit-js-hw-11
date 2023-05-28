// import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import FotoService from './js/fetchFoto';
import { refs } from './js/refs.js'
import { murkupGallery } from './js/markupGallery';

var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const fotoService = new FotoService();

refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  clearGallery();
  fotoService.resetPage();
  fotoService.query = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  console.log(fotoService.query);
  addMoreFoto();
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}

const addMoreFoto = async () => {
  try {
    const { hits, total } = await fotoService.fetchFoto();
    const markup = murkupGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    console.log(fotoService.page);
    lightbox.refresh();

    const maxRequests = Math.ceil(total / fotoService.perPage);
    if (fotoService.page >= maxRequests) {
      console.loge(maxRequests)
      Notify.failure("We're sorry, but you've reached the end of search results.");
      observer.disconnect();
      return;
    }
    observer.observe(refs.gallery.lastElementChild);
  } catch (error) {
    Notify.failure('Something went wrong!');
    observer.disconnect();
  }
};

// Створення спостерігача
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        addMoreFoto();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Початкове спостереження
observer.observe(refs.gallery.lastElementChild);