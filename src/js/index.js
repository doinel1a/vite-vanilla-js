import '../css/global.css';
import '../scss/global.scss';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('#main');
  const counter = main.querySelector('#counter');

  main.addEventListener('click', (event) => {
    const { id, type } = event.target;

    if (type === 'button') {
      const currentCount = Number(counter.textContent);

      switch (id) {
        case 'increment': {
          counter.textContent = currentCount + 1;
          break;
        }
        case 'decrement': {
          counter.textContent = currentCount - 1;
          break;
        }
      }
    }
  });
});
