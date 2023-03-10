import { apiUrl, createElement } from "./utils.js";
/**
 * retrieveing all the productsfrom the api to convert it to json with fetch
 */
function fetchingDtata() {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      implementingData(data);
    })

    /**
     * if the retrieval is not possible,an alert will appear
     */
    .catch((err) => {
      alert(
        "une erreur est survenur lors de la récupération de vos données depuis l'API"
      );
    });
}

//calling the function
fetchingDtata();

/**
   implementing the elements in the DOM
 */
function implementingData(products) {
  for (let i = 0; i < products.length; i++) {
    //anchor and article for each elements,

    //added in the DOM with createElement and .appendchild
    //ANCHOR
    let a = createElement("a");
    a.href = "./product.html?id=" + products[i]._id;
    let items = document.getElementById("items");
    items.appendChild(a);

    //ARTICLE
    let article = createElement("article");
    a.appendChild(article);

    //IMAGE
    let img = createElement("img");
    img.src = products[i].imageUrl;
    img.alt = products[i].altTxt;

    //PRODUCTNAME
    let h3 = createElement("h3");
    h3.setAttribute("class", "productName");
    h3.innerText = products[i].name;

    //PARAGRAPH
    let p = createElement("p");
    p.setAttribute("class", "productDescription");
    p.innerText = products[i].description;

    //creating an array with all the article's elements
    //and adding them to the DOM with the appendchil method
    let articleInfos = [img, h3, p];
    articleInfos.forEach((element) => {
      article.appendChild(element);
    });
  }
}
