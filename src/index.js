export { refs }

//import './css/styles.css';
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



function clearGallery() {
  refs.gallery.innerHTML = "";
}


const debouncedAddMoreFoto = debounce(addMoreFoto, 500);

async function addMoreFoto() {
  const documentRect = document.documentElement.getBoundingClientRect();
  const mid = document.documentElement.clientHeight;

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