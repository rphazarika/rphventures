const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('open', !isOpen);
  });
  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      navigation.classList.remove('open');
    }
  });
}
