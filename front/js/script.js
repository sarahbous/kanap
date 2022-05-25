let articleData = [];

const fetchArticle = async () => {
  await fetch('http://localhost:3000/api/products/')
  .then((res) => res.json())
  .then((promise) => {
    articleData = promise
    console.log(articleData)
  });
  
};


const articleDisplay = async () => {
  await fetchArticle();

  document.getElementById('items')
  .innerHTML = articleData.map((article) => `
  <a href="./product.html?id=${article._id}">
  <article>
  <img src="${article.imageUrl}" alt="${article.atlTxt}">
  <h3 class="productName">${article.name}</h3>
  <p class="productDescription">${article.description}</p>
  </article>
  </a>
  `,
  )
  .join("");

  
};
articleDisplay();


