import axios from 'axios';

export default class FotoService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
<<<<<<< Updated upstream

fetchFoto() {
    const url = `https://pixabay.com/api/?key=35176163-4e9ce6048ecabe9e72c7fef0e&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40&min_width=250&min_height=150&orientation=horizontal`;

    return axios.get(url)
      .then(response => {
        this.page += 1;
        return response.data.hits;
      })
      .catch(error => console.log(error));
}
=======
async fetchFoto() {
  const url = `https://pixabay.com/api/?key=35176163-4e9ce6048ecabe9e72c7fef0e&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=40&min_width=250&min_height=150&orientation=horizontal`;

  try {
    const response = await axios.get(url);

    this.page += 1;
    return {
      hits: response.data.hits,
      total: response.data.total
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
  }
>>>>>>> Stashed changes

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