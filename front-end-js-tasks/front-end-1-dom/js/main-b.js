// Put code of task B here

const main = document.querySelector('main');
const article = document.querySelector('article');

const newArticle = document.createElement('article');
newArticle.innerHTML = article.innerHTML;

main.appendChild(newArticle);