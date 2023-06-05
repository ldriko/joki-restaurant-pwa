const checkLiked = (id) => {
  const liked = localStorage.getItem('likedRestaurants');
  const likedRestaurants = liked ? JSON.parse(liked) : [];
  return likedRestaurants.find((restaurant) => restaurant.id === id);
};

const toggleLikeButton = (id) => {
  const likeButton = document.querySelector(`button[data-id="${id}"]`);
  if (!likeButton) return;
  const liked = checkLiked(id);
  if (liked) {
    likeButton.classList.remove('btn-secondary');
    likeButton.classList.add('btn-primary');
    likeButton.innerHTML = 'Disukai &hearts;';
  } else {
    likeButton.classList.remove('btn-primary');
    likeButton.classList.add('btn-secondary');
    likeButton.innerHTML = 'Suka';
  }
};

const handleLike = (e, id) => {
  const liked = localStorage.getItem('likedRestaurants');
  const likedRestaurants = liked ? JSON.parse(liked) : [];

  const restaurant = likedRestaurants.find(
    (restaurant) => restaurant.id === id
  );

  if (restaurant) {
    const index = likedRestaurants.indexOf(restaurant);
    likedRestaurants.splice(index, 1);
  } else {
    likedRestaurants.push({ id });
  }

  localStorage.setItem('likedRestaurants', JSON.stringify(likedRestaurants));

  toggleLikeButton(id);
};

const fetchRestaurants = async () => {
  const result = await fetch('./data/DATA.json').then((response) =>
    response.json()
  );
  return result.restaurants;
};

const renderRestaurantList = (restaurantListElement, restaurants) => {
  restaurantListElement.innerHTML = '';
  restaurants.forEach((restaurant) => {
    const card = document.createElement('li');
    card.classList.add('restaurant-card');

    const cardImage = document.createElement('img');
    cardImage.classList.add('restaurant-card-image');
    cardImage.src = restaurant.pictureId;
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
    likeButton.addEventListener('click', (e) => handleLike(e, restaurant.id));
    cardButtons.appendChild(likeButton);

    card.appendChild(cardImage);
    cardBody.appendChild(cardName);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardDetail);
    cardBody.appendChild(cardButtons);
    card.appendChild(cardBody);

    restaurantListElement.appendChild(card);
    toggleLikeButton(restaurant.id);
  });
};

export const initializeRestaurantList = async (id) => {
  const restaurantListElement = document.querySelector(id);
  if (!restaurantListElement) return;
  const restaurants = await fetchRestaurants();
  renderRestaurantList(restaurantListElement, restaurants);
};
