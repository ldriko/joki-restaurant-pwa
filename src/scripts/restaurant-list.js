const checkFavorite = (id) => {
  const favoriteString = localStorage.getItem('favorites');
  const favorites = favoriteString ? JSON.parse(favoriteString) : [];
  return favorites.find((restaurant) => restaurant.id === id);
};

const toggleFavoriteButton = (id) => {
  const favoriteButton = document.querySelector(`button[data-id="${id}"]`);
  if (!favoriteButton) return;
  const exist = checkFavorite(id);
  if (exist) {
    favoriteButton.classList.remove('btn-secondary');
    favoriteButton.classList.add('btn-primary');
    favoriteButton.innerHTML = 'Favorit &hearts;';
  } else {
    favoriteButton.classList.remove('btn-primary');
    favoriteButton.classList.add('btn-secondary');
    favoriteButton.innerHTML = 'Tambahkan Favorit';
  }
};

const handleFavorite = (e, id) => {
  const favoriteString = localStorage.getItem('favorites');
  const favorites = favoriteString ? JSON.parse(favoriteString) : [];

  const restaurant = favorites.find((r) => r.id === id);

  if (restaurant) {
    const index = favorites.indexOf(restaurant);
    favorites.splice(index, 1);
  } else {
    favorites.push({ id });
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  toggleFavoriteButton(id);
};

const handleOpen = (id) => {
  window.location.href = `/detail.html?id=${id}`;
};

const fetchRestaurants = async () => {
  const result = await fetch('https://restaurant-api.dicoding.dev/list').then(
    (response) => response.json(),
  );
  return result.restaurants;
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
    likeButton.innerHTML = 'Suka';
    likeButton.setAttribute('data-id', restaurant.id);
    likeButton.addEventListener('click', (e) => {
      handleFavorite(e, restaurant.id);
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
    toggleFavoriteButton(restaurant.id);
  });
};

const initializeRestaurantList = async (id) => {
  const restaurantListElement = document.querySelector(id);
  if (!restaurantListElement) return;
  const restaurants = await fetchRestaurants();
  renderRestaurantList(restaurantListElement, restaurants);
};

export default initializeRestaurantList;
