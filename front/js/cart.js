import { apiUrl } from "./utils.js";
//fetching data from the api's url with a simplified async function
async function getData() {
    const response = await fetch(apiUrl)
    const data = await response.json();

    var basket = []
    console.log(basket)

    var item ={
        product: data.name,
        price : data.price,
        color : data.color
    }

   //product
    const article = document.createElement('article');
    article.classList.add("cart__item");
    const cart__items = document.querySelector("#cart__items");
    cart__items.appendChild(article);

    //image
    let imageDiv = document.createElement('div');
    imageDiv.classList.add("cart__item__img")
    article.appendChild(imageDiv);

    let img = document.createElement('img')
    imageDiv.appendChild(img);
    img.src = data.imageUrl;
    img.alt =data.altText;

    //content
    const contentDiv = document.createElement('div');
    contentDiv.classList.add("cart__item__content");
    cart__items.appendChild(contentDiv);

    //
    const description = document.createElement('div');
    description.classList.add("cart__item__content__description");
    contentDiv.appendChild(description)
    description.innerHTML = `<h2>Nom du produit</h2><p>Vert</p> <p>42,00 €</p>`
   

    const settings = document.createElement('div');
    settings.classList.add("cart__item__content__settings");
    contentDiv.appendChild(settings)

    const quantity = document.createElement('div');
    quantity.classList.add("cart__item__content__settings__quantity");
    contentDiv.appendChild(quantity)
  


    const deletebtn =document.createElement('div')
    deletebtn.classList.add("cart__item__content__settings__delete")
    settings.appendChild(deletebtn)
    deletebtn.innerHTML =`<p class="deleteItem">Supprimer</p>`
    
    let input = document.createElement("input")
    settings.appendChild(input)
    input.classList.add("itemQuantity")
    
  

}
//calling the function
getData();
