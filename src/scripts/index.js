import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';

import { initializeNavBar } from './appbar';
import { initializeRestaurantList } from './restaurant-list';
import { initializeSkipButton } from './skip';

initializeNavBar('navbar');
initializeRestaurantList('#restaurantList');
initializeSkipButton('#skipButton', '#listSection');
