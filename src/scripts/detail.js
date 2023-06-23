import {
  initializeDatabase,
  findFavoriteIndex,
  addFavorite,
  removeFavorite,
} from './favorite';

const toggleFavoriteButton = (id) => {
  const likeButton = document.querySelector('#restaurantFavorite');
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

const renderCustomerReviews = (reviews) => {
  const reviewList = document.querySelector('#customerReviews');
  reviewList.innerHTML = '';
  reviews.forEach((review) => {
    const div = document.createElement('div');
    div.classList.add('customer-review');
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('flex', 'justify-between', 'mb-1');
    const small = document.createElement('small');
    small.innerHTML = review.name;
    innerDiv.appendChild(small);
    const h6 = document.createElement('h6');
    h6.innerHTML = review.date;
    innerDiv.appendChild(h6);
    const p = document.createElement('p');
    p.innerHTML = review.review;
    div.appendChild(innerDiv);
    div.appendChild(p);
    reviewList.appendChild(div);
  });
};

const postReview = async (id) => {
  const name = document.querySelector('#reviewName').value;
  const review = document.querySelector('#reviewText').value;

  const result = await fetch('https://restaurant-api.dicoding.dev/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      name,
      review,
    }),
  }).then((response) => response.json());

  if (!result || result.error) {
    return;
  }

  const { customerReviews } = result;
  renderCustomerReviews(customerReviews);
};

const renderMenu = (id, menus) => {
  const menuList = document.querySelector(`#${id}`);
  menuList.innerHTML = '';
  menus.forEach((menu) => {
    const wrapper = document.createElement('div');
    const div = document.createElement('div');
    div.classList.add('restaurant-menu-item');
    div.innerHTML = menu.name;
    wrapper.appendChild(div);
    menuList.appendChild(wrapper);
  });
};

const renderCategories = (categories) => {
  const categoryList = document.querySelector('#restaurantCategories');
  categoryList.innerHTML = '';
  categories.forEach((category) => {
    const div = document.createElement('div');
    div.classList.add('detail-category');
    div.innerHTML = category.name;
    categoryList.appendChild(div);
  });
};

const renderRestaurantDetail = (restaurant) => {
  const image = document.querySelector('#restaurantImage');
  image.src = `https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}`;

  const [name, city, rating, description] = [
    document.querySelector('#restaurantName'),
    document.querySelector('#restaurantCity'),
    document.querySelector('#restaurantRating'),
    document.querySelector('#restaurantDescription'),
  ];

  name.innerHTML = restaurant.name;
  city.innerHTML = restaurant.city;
  rating.innerHTML = `${restaurant.rating} &starf;`;
  description.innerHTML = restaurant.description;

  renderCategories(restaurant.categories);
  renderMenu('foodList', restaurant.menus.foods);
  renderMenu('drinkList', restaurant.menus.drinks);
  renderCustomerReviews(restaurant.customerReviews);
};

const getRestaurantDetail = async (id) => {
  const result = await fetch(
    `https://restaurant-api.dicoding.dev/detail/${id}`,
  ).then((response) => response.json());

  if (!result || result.error) {
    return;
  }

  const { restaurant } = result;
  renderRestaurantDetail(restaurant);
};

const initializeRestaurantDetail = async (id) => {
  getRestaurantDetail(id);
  const submitButton = document.querySelector('#reviewSubmit');
  submitButton.addEventListener('click', () => postReview(id));

  initializeDatabase(() => {
    document
      .querySelector('#restaurantFavorite')
      .addEventListener('click', () => handleFavorite(id));
    toggleFavoriteButton(id);
  });
};

export default initializeRestaurantDetail;
