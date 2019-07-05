console.log('Client side js file is loaded!');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
messageOne.textContent = '';

const messageTwo = document.querySelector('#message-2');
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (event) => {

  event.preventDefault();
  messageOne.textContent = 'loading...';
  messageTwo.textContent = '';

  const location = searchElement.value;

  fetch('/weather?address=' + location)
    .then((response) => {
      response.json()
        .then((data) => {
          if (data.error) {
            return messageTwo.textContent = data.error;
          } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
          }
        });
    });
});
