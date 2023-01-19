import { apiUrl } from "./utils.js";
let localProduct = JSON.parse(localStorage.getItem("basket"));
console.log(localProduct)


async function getData() {
   const response = await fetch(apiUrl)
   //API LIST  .
   const data = await response.json();
   for (let product of localProduct) {
      const basketQuantity = product.quantity
      const basketId = product.id
      const basketColor = product.color;
      //finding elements who have the same id as tle local elements and retrieveing those data
      const basketElements = data.find((element) => element._id === basketId);
      let basketprice = basketElements.price;


      //selecting the html element in which products will nest
      const cart = document.querySelector('#cart__items')
      
      
   
      //adding elements in the DOM with "document.createElement()", ".appendChild", "innerHTML" and ".setAttributes" :

      //article
      const article = document.createElement('article');
      article.setAttribute("class", "cart__item");
      article.dataset.id = `${basketId}`
      article.dataset.color = `${basketColor}`
      article.setAttribute("data-color", ` ${basketColor}`);
      cart.appendChild(article)



      // img
      const imgContainer = document.createElement('div');
      imgContainer.setAttribute("class", "cart__item__img")
      article.appendChild(imgContainer)
      //
      const productImg = document.createElement('img');
      imgContainer.appendChild(productImg);
      productImg.src = basketElements.imageUrl


      //content
      const productContent = document.createElement('div');
      productContent.setAttribute("class", "cart__item__content");
      article.appendChild(productContent)
      //description
      const description = document.createElement('div');
      description.setAttribute("class", "cart__item__content__description");
      productContent.appendChild(description);
      description.innerHTML = `
     <h2>${basketElements.name}</h2>
     <p>${basketColor}</p>
     <p>${basketprice}€</p>
     `
      //settings
      const settings = document.createElement('div');
      settings.setAttribute("class", "cart__item__content__settings");
      productContent.appendChild(settings);

      //quantity
      const quantitySettings = document.createElement('div');
      quantitySettings.setAttribute("class", "cart__item__content__settings__quantity");
      settings.appendChild(quantitySettings)

      //
      const p = document.createElement('p');
      p.innerText = "Qté : "
      quantitySettings.appendChild(p)

      //add item//reduce item//input
      const quantityInput = document.createElement('input');
      quantityInput.setAttribute("class", "itemQuantity");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("name", "itemQuantity");
      quantityInput.setAttribute("min", "1");
      quantityInput.setAttribute("max", "100");
      quantityInput.setAttribute("value", `${basketQuantity}`);
      quantitySettings.appendChild(quantityInput);

      //
      
      //delete button
      const deleteSettings = document.createElement('div');
      deleteSettings.setAttribute("class", "cart__item__content__settings__delete");
      settings.appendChild(deleteSettings);
      //
      const deletebtn = document.createElement('p');
      deletebtn.setAttribute("class", "deleteItem");
      deletebtn.innerHTML = `Supprimer `;
      deleteSettings.appendChild(deletebtn);

      //total quantity
      let totalBasketQuantity = 0
      for (let i=0; i< localProduct.length ; i++)
      {
         totalBasketQuantity+= localProduct[i].quantity;
      }
      document.querySelector('#totalQuantity').innerText = totalBasketQuantity
      
      //


      //total price
      //const totalBasketPrice = [];
      //document.querySelector('#totalPrice').innerText = '5'
   }






}









//calling the function
getData();
