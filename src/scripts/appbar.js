export const initializeNavBar = (id) => {
  const navbar = document.getElementById(id);
  const menu = navbar.querySelector('.navbar__menu');
  const burger = navbar.querySelector('.navbar__burger');

  burger.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
};
