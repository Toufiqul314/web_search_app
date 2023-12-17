const accessKey="SXALFhGMg9kHFU_3Xw5H_HADqjFUXmKKvC68ER73BE4";

const formEl=document.querySelector("form");
const inputE=document.getElementById("search-input");
const searchResults=document.querySelector(".search-results");
const showMore=document.getElementById("show-btn");

let inputData="";
let page=1;
async function searchImages(){
inputData=inputE.values;
const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

//fetch url data
const response=await fetch(url);
const data=await response.json();

//json =>html
const results=data.results;

if(page==1){
    searchResults.innerHTML="";
}


//template html
results.map((result)=>{
const imageWrapper=document.createElement('div');
imageWrapper.classList.add("serch-result");
const image=document.createElement('img');
image.src=result.urls.small
image.alt=result.alt_description
const imageLink=document.createElement('a');
imageLink.href=result.links.html
imageLink.target="_blank"
imageLink.textContent=result.alt_description

//appand 
imageWrapper.appendChild(image);
imageWrapper.appendChild(imageLink);
searchResults.appendChild(imageWrapper);
});

page++;
if(page>1){
    showMore.style.display="block";
}

}

formEl.addEventListener("submit",(event)=>{
event.preventDefault();
page=1;
searchImages();;
});

showMore.addEventListener('click',(event)=>{
searchImages();;
});