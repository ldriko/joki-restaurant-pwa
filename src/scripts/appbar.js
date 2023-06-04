export const initializeNavBar = (id) => {
  const navbar = document.getElementById(id);
  const menu = navbar.querySelector('.navbar-menu');
  const burger = navbar.querySelector('.navbar-burger');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
};
