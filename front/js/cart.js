//getting the pushed items from the localstorage
let basket = localStorage.getItem("basket");
console.log(basket)

 //selecting the html element in which products will nest
 const cart = document.querySelector('#cart__items')
    
 //adding elements in the DOM with "document.createElement()", ".appendChild", "innerHTML" and ".setAttributes" :

 //article
 const article = document.createElement('article');
 article.setAttribute("class", "cart__item");
 cart.appendChild(article)

 // img
 const imgContainer = document.createElement('div');
 imgContainer.setAttribute("class", "cart__item__img")
 article.appendChild(imgContainer)
 //
 const productImg = document.createElement('img');
 imgContainer.appendChild(productImg);
 
 //content
 const productContent = document.createElement('div');
 productContent.setAttribute("class", "cart__item__content");
 article.appendChild(productContent)
 //description
 const description = document.createElement('div');
 description.setAttribute("class", "cart__item__content__description");
 productContent.appendChild(description);
 description.innerHTML = `
 <h2>Nom du produit</h2>
 <p>Vert</p>
 <p>42,00 €</p>
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
 quantityInput.setAttribute("value", "");

 quantitySettings.appendChild(quantityInput);

 //delete button
 const deleteSettings = document.createElement('div');
 deleteSettings.setAttribute("class", "cart__item__content__settings__delete");
 settings.appendChild(deleteSettings);
 //
 const deletebtn = document.createElement('p');
 deletebtn.setAttribute("class", "deleteItem");
 deletebtn.innerHTML = `Supprimer `;
 deleteSettings.appendChild(deletebtn);