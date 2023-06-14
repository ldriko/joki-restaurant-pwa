const listenToFirstTab = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      document.querySelector('#skipContainer').classList.remove('hidden');
      document.querySelector('#skipContainer').classList.add('flex');
    }
  });
};

export const initializeSkipButton = (id) => {
  listenToFirstTab();
  const button = document.querySelector(id);
  button.addEventListener('click', () => button.classList.add('hidden'));
};
