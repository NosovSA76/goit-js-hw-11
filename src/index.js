// import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import FotoService from './js/fetchFoto';
import { refs } from './js/refs.js'
import { murkupGallery } from './js/markupGallery';
import { notifyInit } from './js/notifyInit';

var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
const fotoService = new FotoService();
let maxRequests = 13;
let minSerch


refs.searchForm.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  clearGallery();
  fotoService.resetPage();
  fotoService.query = e.currentTarget.elements.searchQuery.value.trim().toLowerCase();
  if (fotoService.query) {
    minSerch = 41
    addMoreFoto();
  }
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}

const addMoreFoto = async () => {
  try {
    const { hits, total } = await fotoService.fetchFoto();
    minSerch = total
    if (total && fotoService.page === 2) {
      Notify.success(`Hooray! We found ${total} images.`, notifyInit);
    }
    else if (total === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.", notifyInit);
      return;
    }

    const markup = murkupGallery(hits);

    refs.gallery.insertAdjacentHTML('beforeend', markup);
    const { height: cardHeight } = document
    .querySelector(".gallery")
   .firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });

    lightbox.refresh();
    maxRequests = 13;

    if (total <= 520) {
      console.log(minSerch)
      maxRequests = Math.ceil(total / 40);
    }

    observer.observe(refs.gallery.lastElementChild);
  }

  catch (error) {
    Notify.failure('Something went wrong!', notifyInit);
    observer.disconnect();
  }
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {

      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        if (fotoService.page === maxRequests) {
      Notify.failure("We're sorry, but you've reached the end of search results.", notifyInit);
      }
        if (fotoService.page === maxRequests + 1) {
      return;
      }

        if (minSerch <= 40) {
        return;
        }

        addMoreFoto();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
