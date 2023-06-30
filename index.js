/*const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const targetURL = 'https://uwindsor.primo.exlibrisgroup.com/discovery/search?query=any,contains,computer%20science&tab=new_Windsor_Omni&search_scope=OCUL_Discovery_Network&vid=01UTON_UW:UWINDSOR&facet=library,include,2181%E2%80%93147948590002181&mfacet=tlevel,include,available_p,1&mfacet=rtype,include,books,2&lang=en&offset=0';

const getPokemons = ($) => {
  const pokemons = $('div.list-item-wrapper');
  const pokemonData = [];

  pokemons.each((index, el) => {
    const pokemon = {};
    //pokemon.name = $(el).find('h3').text();
    pokemon.image = $(el).find('a > img').attr('src'); 
    //pokemon.location = $(el).find('.search-result-availability-line-wrapper').text();
    pokemonData.push(pokemon);
  });

  return pokemonData;
}

const scrapeWebsite = async () => {
  try {
    const response = await axios.get(targetURL);
    const $ = cheerio.load(response.data);
    const pokemonData = getPokemons($);

    fs.writeFile("pokemon.json", JSON.stringify(pokemonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data written to file successfully!");
    });
  } catch (error) {
    console.error(error);
  }
};

scrapeWebsite();*/

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require('fs');
const url = "https://uwindsor.primo.exlibrisgroup.com/discovery/search?query=any,contains,computer%20science&tab=new_Windsor_Omni&search_scope=OCUL_Discovery_Network&vid=01UTON_UW:UWINDSOR&facet=library,include,2181%E2%80%93147948590002181&mfacet=tlevel,include,available_p,1&mfacet=rtype,include,books,2&lang=en&offset=0";

async function scrape() {
  //Fetch the data
  const response= await axios.get(url);
  const html = response.data;

  const $ = cheerio.load(html);
  const pokemonData = [];
  $('div.list-item-wrapper').each((index,el) => {

    
    const text = $(el).find('span[ng-if="::(!$ctrl.isEmailMode())"][ng-bind-html="$ctrl.highlightedText"][dir="auto"]').text();
    console.log('Text:', text);
    pokemonData.push(text);
  });
  fs.writeFile("pokemon.json", JSON.stringify(pokemonData, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file successfully!");
  });
  //const spanElement = $('span[ng-if="::(!$ctrl.isEmailMode())"][ng-bind-html="$ctrl.highlightedText"][dir="auto"]');

  // Get the text within the span element
  //const text = spanElement.text();

  //console.log('Text:', text);
}

scrape();