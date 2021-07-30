const DEBOUNCE_DELAY = 300;
import ApiGallery from './ferch-info';
import galleryPicturesTpl from '../templates/galleryPicturesTpl.hbs';
import { searchElement, searchButton, searchForm, pictureCard } from './get-elements';
import { Notify} from "notiflix";
import LoadMoreBtn from "./load-more-btn";
const apiGallery = new ApiGallery();

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true
});
searchButton.addEventListener('click', onSearch)
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);



function onSearch(e) {
   
    e.preventDefault();
    clearPicturesContainer();
    apiGallery.query = searchElement.value;
      if (apiGallery.query === '') {
       Notify.failure('Type search parameters...');
      }
      else if (apiGallery.fetchPictures.length === 0) {
           console.log(apiGallery)
        Notify.failure('Nothing found');
      }
      else {
       Notify.success("Hooray! We found totalHits images.");;
    }
    loadMoreBtn.show();
    loadMoreBtn.disable();
    apiGallery.resetPage();
    apiGallery.fetchPictures()
        .then(appendPictures)};
function onLoadMore(e) {
    loadMoreBtn.disable();
    e.preventDefault();
    apiGallery.fetchPictures()
        .then(appendPictures)
    loadMoreBtn.abable();
    
}
function appendPictures(pictures) {
    pictureCard.insertAdjacentHTML('beforeend', galleryPicturesTpl(pictures))
    loadMoreBtn.enable();

}
function clearPicturesContainer() {
    pictureCard.innerHTML ='';
}
