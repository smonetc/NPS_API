'use strict';

const apiKey = 'sslHOEb7GMpDPIu1vkmuVYAPHWd8TlNmceiIfMmh';

// const searchUrl= 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
    
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <a href='${responseJson.data[i].url}'>Visit Park Site</a>
        </li>`
      )};

    //   still working on making the address appear

    //   for (let i = 0; i < responseJson.data[i].addresses[i].length; i++){
    
    //     $('.address').append(
    //       `<h5>${responseJson.data[i].addresses[i].type}:</h5>
    //       <p class="addresses">${responseJson.data[i].addresses[i].line1}</p>
    //       <p class="addresses">${responseJson.data[i].addresses[i].line2}</p>
    //       <p class="addresses">${responseJson.data[i].addresses[i].line3}</p>
    //       <p class="addresses">${responseJson.data[i].addresses[i].city}, ${parkData[i].addresses[x].stateCode}, ${parkData[i].addresses[x].postalCode}</p>
    //       `
    //     )};


    //display the results section  
    $('#results').removeClass('hidden');
  };

  function getParks(query, limit=10) {
    const params = {
            stateCode: query,
            limit,
            api_key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = 'https://developer.nps.gov/api/v1/parks' + '?' + queryString;
  
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').html(`<h3>Something went wrong: ${err.message}</h3>`);
      });
  }
  
  function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#state-name').val();
      const maxResults = $('#number-results').val();
      getParks(searchTerm, maxResults);
    });
  }
  
  $(watchForm);