
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
      }
    )
    .join('');
}