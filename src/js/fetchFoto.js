import axios from 'axios';
export default class FotoService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
fetchFoto() {
    const url = `https://pixabay.com/api/?key=35176163-4e9ce6048ecabe9e72c7fef0e&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40&min_width=250&min_height=150&orientation=horizontal`;
    return axios.get(url)
      .then(response => {
        this.page += 1;
        return response.data.hits;
      })
      .catch(error => console.log(error));
}
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}