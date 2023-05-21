import  refs  from '../index';

export function murkupGallery(hits) {
return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  var lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250, showCounter: false });
  lightbox.refresh()
}