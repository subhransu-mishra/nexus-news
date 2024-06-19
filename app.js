fetch('https://newsapi.org/v2/everything?q=', {
    method: 'GET'
  }).then(response => {
    if (response.status === 426) {
      const upgradeHeader = response.headers.get('Upgrade');
      console.log(`Server prefers protocol upgrade to: ${upgradeHeader}`);
      
      // Based on the upgradeHeader value, you can implement logic to switch protocols
      // For instance, if the server prefers HTTP/2, you may need to use a different client library that supports HTTP/2
    } else {
      return response.json();
    }
  }).then(data => {
    // Process the response data
  }).catch(error => {
    console.error('Error fetching the resource:', error);
  });
const API_KEY = "f48ca7a1238148878265cec273414a3b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{
    fetchNews("India");
});
function reload(){
    window.location.reload();
};
function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = ''; 

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    }
    );
}
async function fetchNews(query){

    try{
        const res = await fetch(`${url} ${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data); 
        bindData(data.articles);
    }
    catch(err){
        console.log(err);
    }
    
};

 
function fillDataInCard(cardClone,article){
    const newsImage = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-description");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleDateString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `Souce - ${article.source.name} | ${date}`;

    

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });
}

let curSelectedNav = null;


function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");

}
const searchButton = document.getElementById("search-button");
const searchtext = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


const about = document.getElementById("about-icon");
about.addEventListener("click",()=>{
    window.location.href = "about_us.html";
});



const shareBtn = document.getElementById("share-btn");
const overlay = document.querySelector(".overlay");
const shareModal = document.querySelector(".share");

const title = window.document.title;
const shareUrl = window.document.location.href;

