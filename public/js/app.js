console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationElement = document.querySelector('.js-location');
const dataElement = document.querySelector('.js-data');

weatherForm.addEventListener('submit', (event) => {
  locationElement.innerHTML = '';
  dataElement.innerHTML = '';
  event.preventDefault();
  locationElement.innerHTML = 'Just Loading....'

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    return response.json();
  }).then((output) => {
    if (output.error) {
      return locationElement.innerHTML = output.error, dataElement.innerHTML='';
    }
    console.log(output);

    locationElement.innerHTML = `
      Location: ${output[0].location}
    `;

    dataElement.innerHTML = `
      It is ${output[1].forecastData.main.temp} degrees here and feels like ${output[1].forecastData.main.feels_like} out there
    `;
  }).catch((error) => {
    locationElement.innerHTML = 'Unable to fetch data please try again later'

  })
})