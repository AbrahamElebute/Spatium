// Selectors
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const favoriteUl = document.querySelector(".favorite-ul")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const tickDiv = document.querySelector(".tick")
const iconBeat = document.querySelector(".iconbeat")
document.addEventListener("DOMContentLoaded", getLinks);
document.addEventListener("DOMContentLoaded", getFavorite);
function createLink(argument) {

        //New Li
        const newLi = document.createElement("li");
        //Li Tick Div
        const newTickDiv = document.createElement("div");
        newTickDiv.className = "tick"
        newTickDiv.title = "Marker"
        //Li favicon div        
        var pathArray = argument.split('/');
        var protocol = pathArray[0];
        var host = pathArray[2];
        var url = protocol + '//' + host + "/" + "favicon.ico";
        if (host === undefined) {
                var url = "Images/spatium-logo/default.png";

        }

        const newFaviconDiv = document.createElement("div");
        newFaviconDiv.className = "favicon"
        newFaviconDiv.title = "favicon"


        //Li favicon div img        
        const newFaviconImg = document.createElement("img");
        newFaviconImg.src = url
        newFaviconImg.onerror = function () {
                newFaviconImg.src = "Images/spatium-logo/default.png"
                newFaviconImg.title = "404"

        };
        //Li wrap div        
        const newWrapDiv = document.createElement("div");
        newWrapDiv.className = "wrap"
        // Li wrap div date        
        const newWrapDivDate = document.createElement("div");
        newWrapDivDate.className = "date"
        newWrapDivDate.innerHTML = dateFunc()
        //Li wrap div a        
        const newWrapDivA = document.createElement("a");
        newWrapDivA.title = argument
        newWrapDivA.href = argument;
        newWrapDivA.target = "_blank"
        newWrapDivA.textContent = argument
        saveLocalgetLinks([argument, dateFunc()]);
        inputEl.value = " "

        //Li bin div       
        const newBinDiv = document.createElement("div");
        newBinDiv.className = "bin"
        newBinDiv.title = "Link full mode"



        //Li bin div i      
        const newBinDivI = document.createElement("i");
        newBinDivI.className = "fa-solid fa-ellipsis-vertical"
        //Li vertical      
        const newVertical = document.createElement("div");
        newVertical.className = "vertical"

        //Li vertical bin-btn      
        const newBinBtn = document.createElement("div");
        newBinBtn.className = "bin-btn"
        newBinBtn.title = "Delete"

        //Li vertical bin-btn  img
        const newBinBtnImg = document.createElement("img");
        newBinBtnImg.src = "Images/icons8-bin-64.png"
        newBinBtnImg.className = "bin-img"

        //Li vertical bin-btn  h4
        const newBinBtnH4 = document.createElement("h4");

        //Li vertical favorite-btn     
        const favoriteBtn = document.createElement("div");
        favoriteBtn.className = "favorite-btn"
        favoriteBtn.title = "Add to favorite"

        //Li vertical favorite-btn  img
        const favoriteBtnImg = document.createElement("img");
        favoriteBtnImg.src = "Images/thumbs-up-solid.svg"
        favoriteBtnImg.className = "favorite-btn"

        //Li vertical bin-btn  h4
        const favoriteBtnH4 = document.createElement("h4");
        ulEl.prepend(newLi);
        newLi.appendChild(newTickDiv);
        newLi.appendChild(newFaviconDiv);
        newLi.appendChild(newWrapDiv);
        newLi.appendChild(newBinDiv);
        newLi.appendChild(newVertical);
        newFaviconDiv.appendChild(newFaviconImg);
        newWrapDiv.appendChild(newWrapDivDate);
        newWrapDiv.appendChild(newWrapDivA);
        newBinDiv.appendChild(newBinDivI);
        newVertical.appendChild(newBinBtn)
        newBinBtn.appendChild(newBinBtnImg)
        newBinBtn.appendChild(newBinBtnH4)
        newVertical.appendChild(favoriteBtn)
        favoriteBtn.appendChild(favoriteBtnImg)
        favoriteBtn.appendChild(favoriteBtnH4)
}
function dateFunc() {
        return new Date().toLocaleString();
}
inputBtn.addEventListener("click", function () {
        createLink(inputEl.value)
})

//  Tab fuction
tabBtn.addEventListener("click", function (argument) {
        if (window.event.ctrlKey) {
                chrome.tabs.query({ currentWindow: true }, function (tabs) {
                        tabs.forEach(function (tab) {
                                createLink(tab.url)
                        });
                });
        }
        else {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        createLink(tabs[0].url)

                })
        }

})

ulEl.addEventListener("click", function (e) {
        const item = e.target;

        if (item.classList.contains("bin-img")) {
                const link = item.parentElement.parentElement.parentElement;
                link.remove()
               
        }
        if (item.classList.contains("favorite-btn")) {
                const toFav = item.parentElement.parentElement.parentElement.children[2].children[1];
                //fav Li
                const favLi = document.createElement("li");
                //fav Li a
                const favLiA = document.createElement("a");     
                favoriteUl.appendChild(favLi);
                favLi.appendChild(favLiA);
                favLiA.href = toFav
                favLiA.textContent = toFav
                favLiA.target = "_blank"
                const toFavText = JSON.stringify(favLiA.textContent)
                saveLocalgetFavorite(toFavText);

        }
        if (item.classList.contains("tick")) {
                const link = item.parentElement;
                link.classList.toggle("marked")
        }
        if (item.classList.contains("bin")) {
                const toFav = item.parentElement.children[2].children[1];
                alert(toFav)
        }
})

deleteBtn.addEventListener("dblclick", function () {
        ulEl.textContent = " "
        localStorage.removeItem("Links")

})

iconBeat.addEventListener("dblclick", function () {
        ulEl.textContent = " "
        favoriteUl.textContent = " "
        localStorage.clear()
        alert("Factory Reseting compelet")

})

function saveLocalgetLinks(link) {
        // CHECK  if Links are present in local storage

        let Links;
        if (localStorage.getItem("Links") === null) {
                Links = [];
        } else {
                Links = JSON.parse(localStorage.getItem("Links"));
        }

        Links.push(link);

        localStorage.setItem("Links", JSON.stringify(Links));
}

function saveLocalgetFavorite(favorite) {
        let favorites;
        if (localStorage.getItem("favorites") === null) {
                favorites = [];
        } else {
                favorites = JSON.parse(localStorage.getItem("favorites"));
        }

        favorites.push(favorite);

        localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavorite() {
        let favorites;
        if (localStorage.getItem("favorites") === null) {
                favorites = [];
        } else {
                favorites = JSON.parse(localStorage.getItem("favorites"));
        }
        favorites.forEach(function (favorite) {
                const toFav = favorite.replace(/"/g, '')
                //fav Li
                const favLi = document.createElement("li");
                //fav Li a
                const favLiA = document.createElement("a");
                favoriteUl.appendChild(favLi);
                favLi.appendChild(favLiA);
                favLiA.href = toFav
                favLiA.textContent = toFav
                favLiA.target = "_blank"
        })
}
function getLinks() {

        // CHECK  if Links are present in local storage

        let Links;
        if (localStorage.getItem("Links") === null) {
                Links = [];
        } else {
                Links = JSON.parse(localStorage.getItem("Links"));
        }

        Links.forEach(function (link) {
                //New Li
                const newLi = document.createElement("li");
                //Li Tick Div
                const newTickDiv = document.createElement("div");
                newTickDiv.className = "tick"
                newTickDiv.title = "Marker"
                //Li favicon div        
                var pathArray = link[0].split('/');
                var protocol = pathArray[0];
                var host = pathArray[2];
                var url = protocol + '//' + host + "/" + "favicon.ico";
                if (host === undefined) {
                        var url = "Images/spatium-logo/default.png";

                }

                const newFaviconDiv = document.createElement("div");
                newFaviconDiv.className = "favicon"
                newFaviconDiv.title = "favicon"


                //Li favicon div img        
                const newFaviconImg = document.createElement("img");
                newFaviconImg.src = url
                newFaviconImg.onerror = function () {
                        newFaviconImg.src = "Images/spatium-logo/default.png"
                        newFaviconImg.title = "404"

                };
                //Li wrap div        
                const newWrapDiv = document.createElement("div");
                newWrapDiv.className = "wrap"
                // Li wrap div date        
                const newWrapDivDate = document.createElement("div");
                newWrapDivDate.className = "date"
                newWrapDivDate.innerHTML = link[1]
                //Li wrap div a        
                const newWrapDivA = document.createElement("a");
                newWrapDivA.title = link[0]
                newWrapDivA.href = link[0]
                newWrapDivA.target = "_blank"
                newWrapDivA.textContent = link[0]

                //Li bin div       
                const newBinDiv = document.createElement("div");
                newBinDiv.className = "bin"
                newBinDiv.title = "Link full mode"



                //Li bin div i      
                const newBinDivI = document.createElement("i");
                newBinDivI.className = "fa-solid fa-ellipsis-vertical"
                //Li vertical      
                const newVertical = document.createElement("div");
                newVertical.className = "vertical"

                //Li vertical bin-btn      
                const newBinBtn = document.createElement("div");
                newBinBtn.className = "bin-btn"
                newBinBtn.title = "Delete"

                //Li vertical bin-btn  img
                const newBinBtnImg = document.createElement("img");
                newBinBtnImg.src = "Images/icons8-bin-64.png"
                newBinBtnImg.className = "bin-img"

                //Li vertical bin-btn  h4
                const newBinBtnH4 = document.createElement("h4");

                //Li vertical favorite-btn     
                const favoriteBtn = document.createElement("div");
                favoriteBtn.className = "favorite-btn"
                favoriteBtn.title = "Add to favorite"

                //Li vertical favorite-btn  img
                const favoriteBtnImg = document.createElement("img");
                favoriteBtnImg.src = "Images/thumbs-up-solid.svg"
                favoriteBtnImg.className = "favorite-btn"

                //Li vertical bin-btn  h4
                const favoriteBtnH4 = document.createElement("h4");

                ulEl.prepend(newLi);
                newLi.appendChild(newTickDiv);
                newLi.appendChild(newFaviconDiv);
                newLi.appendChild(newWrapDiv);
                newLi.appendChild(newBinDiv);
                newLi.appendChild(newVertical);
                newFaviconDiv.appendChild(newFaviconImg);
                newWrapDiv.appendChild(newWrapDivDate);
                newWrapDiv.appendChild(newWrapDivA);
                newBinDiv.appendChild(newBinDivI);
                newVertical.appendChild(newBinBtn)
                newBinBtn.appendChild(newBinBtnImg)
                newBinBtn.appendChild(newBinBtnH4)
                newVertical.appendChild(favoriteBtn)
                favoriteBtn.appendChild(favoriteBtnImg)
                favoriteBtn.appendChild(favoriteBtnH4)

        });
}
function removeLocalLink(link){
        let Links;
        if (localStorage.getItem("Links") === null) {
                Links = [];
        } else {
                Links = JSON.parse(localStorage.getItem("Links"));
        }
        var linkIndex = item.parentElement;
        Links.splice(Links.indexOf(linkIndex), 1);
        localStorage.setItem("Links", JSON.stringify(Links));
}