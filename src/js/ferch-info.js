import { Notify} from "notiflix";
const axios = require('axios').default;
export default class ApiGallery {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
  }
  
  async fetchPictures() {
    try {
      const BASE_URL = 'https://pixabay.com/api/?';
      const KEY = 'key=11457049-d033a2f4a1e23c68b630f88e5';
      const response = await axios.get(`${BASE_URL}${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);
      const data = response.data
      this.page += 1;
      if (data.hits.length === 0) {
        Notify.failure('Nothing found');
      }else {
       Notify.success("Hooray! We found totalHits images.");;
    }
    
    return data.hits
    }
    catch (error) { 
      Notify.failure("We're sorry, but you've reached the end of search results.");
    };
  }


resetPage() {
        this.page = 1;
    }
  get query() {
    return this.searchQuery ;
  }
  set query(newQuery) {
    this.searchQuery = newQuery
    return this.searchQuery
  }
}
