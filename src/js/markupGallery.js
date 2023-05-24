<<<<<<< Updated upstream
import  refs  from '../index';

export function murkupGallery(hits) {
return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
=======
import { refs } from './refs.js'
export function murkupGallery(photos) {
  return photos
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return /*html*/ `<div class="photo-card">
   <a href="${largeImageURL}" target="_blank" class="gallery-item">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
</a>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  ).join('');

  refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
  var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, showCounter: false });
  lightbox.refresh()
=======
      }
    )
    .join('');
>>>>>>> Stashed changes
}