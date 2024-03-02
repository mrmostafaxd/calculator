const btnContainer = document.querySelector('#button-container');

btnContainer.addEventListener('click', (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    evt.target.blur();
  }
});
