const express = require('express');

  //creating a route that the front-end can request data from
const { animals } = require('./data/animals.json')

const app = express();

  //function for filter functionality
function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  //note that we save the animalsArray asfilteredResults here:
  
  let filteredResults = animalsArray;
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults
}

  //add the route
app.get('/api/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results)
  }
  res.json(results)
});

app.listen(3001, () => {
  console.log(`API server now on port 3001!`)
})