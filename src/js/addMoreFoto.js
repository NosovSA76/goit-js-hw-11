
import { refs } from './refs.js'
import { murkupGallery } from './markupGallery';
import FotoService from './fetchFoto';


const fotoService = new FotoService();

export async function addMoreFoto() {
  const documentRect = document.documentElement.getBoundingClientRect();
  const mid = document.documentElement.clientHeight;

  if (documentRect.bottom < mid + 500) {
    try {
      const hits = await fotoService.fetchFoto();
      const murkup = murkupGallery(hits);
      refs.gallery.insertAdjacentHTML('beforeend', murkup);
      lightbox.refresh();
    } catch (error) {
       Notify.failure('Something went wrong!');
    }
  }
}