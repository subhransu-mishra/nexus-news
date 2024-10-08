const API_KEY = "83d362e1d8d14d64b88003f228deddbf";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => 
  fetchNews("India")
);
function reload() {
  window.location.reload();
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}
async function fetchNews(query) {

    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);

}

function fillDataInCard(cardClone, article) {
  const newsImage = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector(".news-source");
  const newsDesc = cardClone.querySelector(".news-description");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `Source - ${article.source.name} | ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}
const searchButton = document.getElementById("search-button");
const searchtext = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
  const query = searchtext.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

const about = document.getElementById("about-icon");
about.addEventListener("click", () => {
  window.location.href = "about_us.html";
});

const shareBtn = document.getElementById("share-btn");
const overlay = document.querySelector(".overlay");
const shareModal = document.querySelector(".share");

const title = window.document.title;
const shareUrl = window.document.location.href;

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}
