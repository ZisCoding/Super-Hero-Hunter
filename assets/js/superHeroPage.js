//selecting the background images 
var images = document.getElementsByClassName('background-img');
// iterator to iterate in bakcgroud images
var changeImageIndex = 0;

// this function will apply the fade in and fade out animation to the background images after every 3sec
function changeImage() {
  images[changeImageIndex].style.animation = 'fadeOut 3s ease-in-out';
  changeImageIndex = (changeImageIndex + 1) % images.length;
  images[changeImageIndex].style.animation = 'fadeIn 3s ease-in-out';
}
// calling the funtion when the page is loaded for the first time 
changeImage();
// calling change image in every 3 second 
setInterval(changeImage, 3000);

// this funtion will fetch the character info
async function  getCharacterInfo(){
  
  // making a url object out of the url
  let url = new URL(window.location.href);

  // getting the value of cahracter id from the params
  let paramAValue = url.searchParams.get('id');

  // fetching the data from the server
  let info =   await fetch(`https://superheroapi.com/api.php/1414626872721955/${paramAValue}`);
  let data = await info.json();
  
  // adding info to the dom
  addInfoToDom(data);
}

function addInfoToDom(info){
 
  document.querySelector('title').innerText=info.name;

  document.getElementById('character-info-container').innerHTML = `
  <div id="hero-image-container">
  <img id="hero-image" src=${info.image.url} alt="Image not found" height="100%" width="100%" style="opacity: 0.7;">
  </div>
  <!-- div for charactrer info -->
  <div id="hero-detail-container">
      <!-- name heading -->
      <h1><center>${info.name}</center></h1>
      <!-- div for appereance  -->
      <div id="powerstate-container">
          <h2><center>Appereance</center></h2>
          <ul type="disc" class="horizontal-list">
            <li><h3>gender: ${info.appearance.gender}</h3></li>
            <li><h3>race: ${info.appearance.race}</h3></li>
            <li><h3>height: ${info.appearance.height[0]}</h3></li>
            <li><h3>weight: ${info.appearance.weight[0]}</h3></li>
            <li><h3>eye-color: ${info.appearance["eye-color"]}</h3></li>
            <li><h3>hair-color: ${info.appearance["hair-color"]}</h3></li>
          </ul>  
      </div>
      <!-- div for powerstate -->
      <div id="appereance-container">
          <h2><center>Powerstats</center></h2>
          <ul type="disc" class="horizontal-list">
              <li><h3>intelligence: ${info.powerstats.intelligence}</h3></li>
              <li><h3>strength: ${info.powerstats.strength}</h3></li>
              <li><h3>speed: ${info.powerstats.speed}</h3></li>
              <li><h3>durability: ${info.powerstats.durability}</h3></li>
              <li><h3>power: ${info.powerstats.power}</h3></li>
              <li><h3>combat: ${info.powerstats.combat}</h3></li>      
          </ul>
      </div >
    </div>
  `



}

getCharacterInfo();