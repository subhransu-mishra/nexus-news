const API_KEY = "f48ca7a1238148878265cec273414a3b";
const url = "https://newsapi.org/v2/everything?q=";

const loader = document.getElementById('loader');

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

window.addEventListener("load",()=>{
    fetchNews("India");
});
function reload(){
    window.location.reload();
};

async function fetchNews(query){
    showLoader();
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
})









