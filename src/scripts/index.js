import '../styles/main.css';

import initializeNavBar from './appbar';
import initializeRestaurantList from './restaurant-list';
import initializeSkipButton from './skip';

const prod = process.env.NODE_ENV === 'production';

if (navigator.serviceWorker && prod) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

initializeNavBar('navbar');
if (document.querySelector('#restaurantList')) {
  initializeRestaurantList('#restaurantList');
}
initializeSkipButton('#skipButton');
