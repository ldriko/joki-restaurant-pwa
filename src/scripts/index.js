import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import { initializeNavBar } from './appbar';
import { initializeRestaurantList } from './restaurant-list';

initializeNavBar('navbar');
initializeRestaurantList('#restaurantList');
