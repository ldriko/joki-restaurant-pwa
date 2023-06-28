import '../styles/main.css';

import initializeNavBar from './appbar';
import initializeRestaurantDetail from './detail';
import initializeRestaurantList from './restaurant-list';
import initializeSkipButton from './skip';
import initializeFavoriteRestaurants from './favorite-restaurants';

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

initializeNavBar('navbar');
if (document.querySelector('#restaurantList')) {
  initializeRestaurantList('#restaurantList');
}
if (document.querySelector('#restaurantDetail')) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  initializeRestaurantDetail(id);
}
if (document.querySelector('#favoriteRestaurants')) {
  initializeFavoriteRestaurants('#favoriteRestaurants');
}
initializeSkipButton('#skipButton');
