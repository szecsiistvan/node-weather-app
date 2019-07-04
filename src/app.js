const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialPath = path.join(__dirname, './templates/partials');

// tell express to use handlebars (texts must be the same as here)
app.set('view engine', 'hbs');

// tell express where to find the hbs files (without this line the hbs files must be places in the views folder)
app.set('views', viewsPath);

hbs.registerPartials(partialPath);

// tell express where to find html files (localhost:3000/valami.html will work with this)
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Mead'
  });
});

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'about title',
    name: 'about name'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'This is the help page of the app',
    message: 'This is a placeholder for a meaningful message',
    name: 'Help name'
  });
});

app.get('/weather', (req, res) => {

  const address = req.query.address;
  let forecastNew = '';

  if (!req.query.address) {
    return res.send({
      error: 'You must provide location.'
    });
  }

  geocode(address, (error, {latitude, longitude, location}={})=>{
    if (error) {
      return console.log(error);
    }
    forecast(latitude,longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location);
      console.log('forecastData: '+ forecastData);

      res.send({
        address,
        location,
        forecast: forecastData
      });




    });
  });


});

app.get('/products', (req, res)=>{

  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res)=>{
  res.render('404',{
    errorMessage: 'No help page was found.'
  });
});

app.get('*', (req, res)=>{
  res.render('404',{
    errorMessage: 'Page not found.'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
