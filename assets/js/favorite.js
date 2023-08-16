// this funtion will show all the character inside the local storage
function showFav(){
    let favObj = JSON.parse(localStorage.getItem('obj'));
    let favList = document.getElementById('fav-list')
    
    for(let i in favObj){


        let li = document.createElement('li');
        li.setAttribute('id',favObj[i].id);

        li.innerHTML=`
                <img src=${favObj[i].imgSrc} alt="Image not found" width="70" height="70">
                <span>${favObj[i].name}</span>
                <a href="superHeroPage.html?id=${favObj[i].id}">More info</a>
                <a href="" class="remove-fav" data-id=${favObj[i].id} >Remove Favorite</a>
        `
        favList.appendChild(li);
    }


}
showFav();

function removeFavorite(info){
    let favObj = JSON.parse(localStorage.getItem('obj'));
    delete favObj[info.dataset.id];
    localStorage.setItem('obj',JSON.stringify(favObj));
    document.getElementById(info.dataset.id).remove();
}

let removeLink = document.getElementsByClassName('remove-fav');

// adding removeFav event listener to all the fav links 
for (let i = 0; i < removeLink.length; i++) {
    
    removeLink[i].addEventListener('click', (e) => {
        e.preventDefault();
        removeFavorite(e.currentTarget);
    });
}


