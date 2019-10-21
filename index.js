'use strict';

const apiKey = "pXRKcn7nOvCrwTephATON18r11UBRniSyXLPIuEf";
const searchUrl = "https://developer.nps.gov/api/v1/parks";


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    $('#js-error-message').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
       
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
       <a href="${responseJson.data[i].url}">Check out the website</a>
      </li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getNationalParks (query, limit = 10) {
    const params = {
        q: query,
        api_key: apiKey,
        limit
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

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
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const limit = $('#js-max-results').val();
        getNationalParks(searchTerm, limit);
    });
}

$(watchForm);