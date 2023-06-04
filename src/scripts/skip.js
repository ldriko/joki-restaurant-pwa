export const initializeSkipButton = (id, to) => {
  const button = document.querySelector(id);
  button.addEventListener('click', () => {
    button.classList.add('hidden');
    const element = document.querySelector(to);
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
};
