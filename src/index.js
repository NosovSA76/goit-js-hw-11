// import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import FotoService from './js/fetchFoto';
import { refs } from './js/refs.js'
import { murkupGallery } from './js/markupGallery';
// import { addMoreFoto } from './js/addMoreFoto';

var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const fotoService = new FotoService();
let maxRequests = 13;

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

    if (total && fotoService.page === 2) {
      Notify.success(`Hooray! We found ${total} images.`);
    }
    else if (total === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }

    const markup = murkupGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    if (total <= 520 ){
      maxRequests = Math.ceil(total / 40);
    }

    observer.observe(refs.gallery.lastElementChild);
  }

  catch (error) {
    Notify.failure('Something went wrong!');
    observer.disconnect();
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      if (fotoService.page === maxRequests + 1) {
      Notify.failure("We're sorry, but you've reached the end of search results.");
      observer.disconnect();
      return;
      }
        addMoreFoto();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
