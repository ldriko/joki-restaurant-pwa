import '../styles/main.css';

import { initializeNavBar } from './appbar';
import { initializeRestaurantList } from './restaurant-list';
import { initializeSkipButton } from './skip';

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js');
  });
}

initializeNavBar('navbar');
initializeRestaurantList('#restaurantList');
initializeSkipButton('#skipButton');
