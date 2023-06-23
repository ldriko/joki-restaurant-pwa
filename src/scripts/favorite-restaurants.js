import {
  initializeDatabase,
  findFavoriteIndex,
  addFavorite,
  removeFavorite,
  getFavorites,
} from './favorite';

const toggleFavoriteButton = (id) => {
  const likeButton = document.querySelector(`button[data-id="${id}"]`);
  if (!likeButton) return;
  const liked = findFavoriteIndex(id);
  liked.onsuccess = ({ target: { result } }) => {
    if (result) {
      likeButton.classList.remove('btn-secondary');
      likeButton.classList.add('btn-primary');
      likeButton.innerHTML = 'Favorit &hearts;';
    } else {
      likeButton.classList.remove('btn-primary');
      likeButton.classList.add('btn-secondary');
      likeButton.innerHTML = 'Tambahkan Favorit';
    }
  };
};

const handleFavorite = (id) => {
  let request = findFavoriteIndex(id);
  request.onsuccess = ({ target: { result } }) => {
    if (result) {
      request = removeFavorite(id);
    } else {
      request = addFavorite(id);
    }
    toggleFavoriteButton(id);
  };
};

const handleOpen = (id) => {
  window.location.href = `/detail.html?id=${id}`;
};

const renderRestaurantList = (restaurantListElement, restaurants) => {
  const element = restaurantListElement;
  element.innerHTML = '';
  restaurants.forEach((restaurant) => {
    const card = document.createElement('li');
    card.classList.add('restaurant-card');

    const cardImage = document.createElement('img');
    cardImage.classList.add('restaurant-card-image');
    cardImage.src = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;
    cardImage.alt = restaurant.name;
    cardImage.setAttribute('loading', 'lazy');

    const cardBody = document.createElement('div');
    cardBody.classList.add('restaurant-card-body');
    const cardName = document.createElement('h2');
    cardName.classList.add('restaurant-card-name');
    cardName.innerHTML = restaurant.name;
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('restaurant-card-description');
    cardDescription.innerHTML = restaurant.description;

    const cardDetail = document.createElement('div');
    cardDetail.classList.add('restaurant-card-detail');
    const city = document.createElement('div');
    city.innerHTML = restaurant.city;
    const rating = document.createElement('div');
    rating.innerHTML = `${restaurant.rating} &starf;`;
    cardDetail.appendChild(city);
    cardDetail.appendChild(rating);

    const cardButtons = document.createElement('div');
    cardButtons.classList.add('restaurant-card-buttons');
    const likeButton = document.createElement('button');
    likeButton.classList.add('btn', 'btn-secondary');
    likeButton.innerHTML = 'Tambahkan Favorit';
    likeButton.setAttribute('data-id', restaurant.id);
    likeButton.addEventListener('click', () => {
      handleFavorite(restaurant.id);
    });
    cardButtons.appendChild(likeButton);
    const openButton = document.createElement('button');
    openButton.classList.add('btn', 'btn-primary');
    openButton.innerHTML = 'Buka';
    openButton.setAttribute('data-id', restaurant.id);
    openButton.addEventListener('click', () => handleOpen(restaurant.id));
    cardButtons.appendChild(openButton);

    card.appendChild(cardImage);
    cardBody.appendChild(cardName);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardDetail);
    cardBody.appendChild(cardButtons);
    card.appendChild(cardBody);

    element.appendChild(card);
  });

  initializeDatabase(() => {
    restaurants.forEach((restaurant) => {
      toggleFavoriteButton(restaurant.id);
    });
  });
};

const initializeFavoriteRestaurants = async (id) => {
  const restaurantListElement = document.querySelector(id);
  if (!restaurantListElement) return;
  initializeDatabase(() => {
    const request = getFavorites();
    request.onsuccess = ({ target: { result } }) => {
      renderRestaurantList(restaurantListElement, result);
    };
  });
};

export default initializeFavoriteRestaurants;
