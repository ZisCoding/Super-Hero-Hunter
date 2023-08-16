//selecting the background images 
var images = document.getElementsByClassName('background-img');
// iterator to iterate in bakcgroud images
var changeImageIndex = 0;



// creating object to save the info of fav character
if(localStorage.getItem('obj')==null){
  localStorage.setItem('obj',JSON.stringify({}));
}



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

// this function will add th character id to the local storage of browser 
function addRemoveFavroite(link){
  // if it is already in the fav array
  let favObj = JSON.parse(localStorage.getItem('obj')); 


  if(favObj.hasOwnProperty(link.dataset.id)){
    delete favObj[link.dataset.id];
    link.querySelector('img').src="assets/images/fav-icon.png"
  }else{
    favObj[link.dataset.id]={
      id: link.dataset.id,
      name: link.dataset.name,
      imgSrc: link.dataset.imgsrc
    }
    link.querySelector('img').src="/assets/images/fav-red.png"
  }

  localStorage.setItem('obj',JSON.stringify(favObj));

}



function addResultToDom(data){
  //selecting the search result list so that we can insert search result inside it
  let searchResultList = document.getElementById('search-result-list');


  // for every new search setting the search list to empty
  searchResultList.innerHTML="";

  //if there is a error in fetching result;
  if(data.response=="error"){
    // if there is no input for search then inserting nothing insdie the searchResultList
    if(data.error=="bad name search request"){
      searchResultList.innerHTML="";
    }
    // if no hero with the given name is present
    else if(data.error=="character with given name not found")
    {
    
      searchResultList.innerHTML=`<li class="search-result">
        No data with this name
        </li>`;
    }
    return ;
  }

  let favObj = JSON.parse(localStorage.getItem('obj'));

  // traversing through all the result we got for a search and adding them to the dom
  data.results.forEach(element => {
      let srcValue;
      if(favObj.hasOwnProperty(element.id)){
        srcValue="assets/images/fav-red.png"
      }else{
        srcValue="assets/images/fav-icon.png"
      }

      let li = document.createElement('li');
      li.setAttribute('class',"search-result");

      li.innerHTML=`<a style="display: flex
      ; width: 80%;" href="superHeroPage.html?id=${element.id}">
        <img class="search-character-img" alt="404" src=${element.image.url}>
        &nbsp; &nbsp; ${element.name}
      </a>
      <a href=""  class="favorite" data-id=${element.id} data-name=${element.name} data-imgsrc=${element.image.url}>
        <img class="search-fav-icon" src=${srcValue}>
      </a>`

      searchResultList.appendChild(li);
  });

  // fetching all fav links 
  let favoriteLink = document.getElementsByClassName('favorite');
 
  // adding fav eventlistener to all the fav links 
  for(var i=0 ; i<favoriteLink.length ; i++){
     favoriteLink[i].addEventListener('click',(e)=>{
      e.preventDefault();
      addRemoveFavroite(e.currentTarget );
    });
  }
}

//this function will serach image from the api
async function serachImage(searchedText){
  

  // fetching the data not from marvel api because it is slow
  let searchResult =  await fetch(`https://superheroapi.com/api.php/1414626872721955/search/${searchedText}`);

  // converting the fetched data into json format
  let data = await searchResult.json();

  // calling addResultToDom to show result in the front-end
  addResultToDom(data);
}


// selecting the search box to get the user input from it 
let searchBox = document.getElementById('search-box');

// adding event listener to the search box everytime something is typed inside it 
searchBox.addEventListener('keyup',function(e){
  // passing the input of serach box to the serahcImage function
  serachImage(searchBox.value);
});


