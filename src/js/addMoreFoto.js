
import { refs } from './refs.js'
import { murkupGallery } from './markupGallery';
import FotoService from './fetchFoto';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const fotoService = new FotoService();
var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

export async function addMoreFoto() {
  try {
    const { hits, total } = await fotoService.fetchFoto();
    if (total && fotoService.page === 2) {
      Notify.success(`Hooray! We found ${total} images.`);
    }
    else {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      return;
    }
    const markup = murkupGallery(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    console.log(fotoService.page);
    lightbox.refresh();
    let maxRequests = 13;
    console.log(maxRequests)
    if (total <= 520 ){
      maxRequests = Math.ceil(total / 40);
      console.log(maxRequests)
    }
       console.log(maxRequests)
    if (fotoService.page === maxRequests + 1) {
      console.log(maxRequests)
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