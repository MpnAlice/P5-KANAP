import { apiUrl, productUrl, id, createElement } from "./utils.js";
import { regexForm, validEmail, validaddress, validcity, validfirstName, validlastName } from "./regexForm.js";
/**
 * retrieving the product(s) in basket
 */
let basket = JSON.parse(localStorage.getItem("localproduct")) || [];


/**
 * retrieving the product's data from the API
 */

let products = ""

const fetchProducts = async () => {
   if (products) {
      return products
   }

   //the products are elements of  api
   try {
      const response = await fetch(apiUrl);
      products = await response.json();
      return products
   }

   //if there's an error in retrieving the datas,an alert will appear
   catch (error) {
      alert("une erreur est survenue lors du chargment de vos produits")

   }
}

/**
 * retrieving the products infos form the first retrieves 
 */

let localProducts = async () => {
   const awaitBasket = await fetchProducts()
   const localBasket = basket;

   console.log(awaitBasket)

   //creating a new array which contains the products  price(s) from the api
   //if the element in the local basket have the same id as the element found in the response from the fetch 

   return localBasket.map((item) => {
      const foundElements = awaitBasket.find((element) => element._id == item.id);

      // a new array is array is return elements from the localbasket and api,therefore ,we can have the price of the products
      return {
         ...item,

         ...foundElements,
      }

   })

}


/**
 * CREATING ELEMENTS IN CART 
 */
// products in storage are in arrays made of a fusion of local basket and api's element 
//only if they share the same id

let productsInStorage = await localProducts()
for (let product of productsInStorage) {

   //calling the function to add elements in the DOM for each product
   implementingProducts(product)

}


// CREATING A FUNCTION TO IMPLEMENT EACH ELEMENT TO THE CART

function implementingProducts(product) {

   let cart = document.getElementById('cart__items')

   //article
   const article = document.createElement('article');
   article.setAttribute("class", "cart__item");
   article.dataset.id = `${product._id}`
   article.dataset.color = `${product.color}`
   article.setAttribute("data-color", ` ${product.color}`);
   cart.appendChild(article)

   // img
   const imgContainer = document.createElement('div');
   imgContainer.setAttribute("class", "cart__item__img")
   article.appendChild(imgContainer)
   //
   const productImg = document.createElement('img');
   imgContainer.appendChild(productImg);
   productImg.src = product.imageUrl
   //content
   const productContent = document.createElement('div');
   productContent.setAttribute("class", "cart__item__content");
   article.appendChild(productContent)
   //description
   const description = document.createElement('div');
   description.setAttribute("class", "cart__item__content__description");
   productContent.appendChild(description);
   // 
   let h2 = createElement("h2");
   h2.innerText = product.name;
   let p1 = createElement("p");
   p1.innerHTML = product.color;
   let p2 = createElement("p")
   p2.innerHTML = `${product.price}€`

   //
   let descriptionElement = [h2, p1, p2]
   descriptionElement.forEach(element => {
      description.appendChild(element)

   });

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
   quantityInput.setAttribute("value", `${product.quantity}`);
   quantitySettings.appendChild(quantityInput);


   //DYNAMICALLY CHANGING THE QUANTITY WITH THE INPUT ON CART

   //delete button
   const deleteSettings = document.createElement('div');
   deleteSettings.setAttribute("class", "cart__item__content__settings__delete");
   settings.appendChild(deleteSettings);

   //
   const deletebtn = document.createElement('p');
   deletebtn.setAttribute("class", "deleteItem");
   deletebtn.innerHTML = `Supprimer `;
   deleteSettings.appendChild(deletebtn);
   removeItems(deletebtn)
   //



}

//////////MODIFICATION OF THE TOTALS  BY CHANGING QUANITY OR REMOVING ITEMS

/////////A FUNCTION TO REMOVE AND ITEM FORM THE CART 
function removeItems() {

   //initializing the dletete button
   var removeBtn = document.querySelectorAll(".deleteItem");
   removeBtn.forEach((removeBtn) => {
      removeBtn.addEventListener("click", (event) => {

         event.preventDefault()

         let deletedArticle = removeBtn.closest('article')

         //filtering the remainings elements with the data set ,the id and color should be different
         basket = basket.filter(e => e.id !== deletedArticle.dataset.id && e.color !== deletedArticle.dataset.id);
         localStorage.setItem("localproduct", JSON.stringify(basket));

         alert("cet article sera supprimé")
         //deleting  items from the node
         if (deletedArticle.parentNode) {
            deletedArticle.parentNode.removeChild(deletedArticle)
            console.log(deletedArticle)

         }
         else {
            if  (basket =[] || basket == undefined){
               alert('votre panier est vide')
            }
         }


         //reloading after deleting the item
         window.location.reload()

      })

   })

}



//////////A FUNCTION TO CHANGE THE QUANTITY OF AN ITEM

function changeQuantity() {

   const quantitySelector = document.getElementsByClassName("itemQuantity");

   for (var i = 0; i < quantitySelector.length; i++) {
      var input = quantitySelector[i];
      let localproduct = basket[i];

      input.addEventListener("change", (e) => {
         e.preventDefault;
         //
         let newValue = Number(input.value)

         //the value is equal under 0 or is not a number

         if (isNaN(newValue) || newValue < 1 || newValue > 100) {
            alert("attention,la quantité de cet article n'est pas appropriée,nous vous invitons à la modifier")

         }

         // the new value is != from 0 //correct the bug here
         if (newValue >= 1 || newValue <= 100) {
            localproduct.quantity = newValue
            alert("la quantité de cet article a bien été modifiée")
         }

         localStorage.setItem("localproduct", JSON.stringify(basket))

         //reloading after adding the item
         window.location.reload()


      }
      )
   }
}
changeQuantity()

//////////A FUNCTION WHICH UPDATES THE QUANTITY  AND THE PRICE

function quantityAndpriceUpdate() {

   let cartQuantity = document.getElementById("totalQuantity")
   let itemsQuantity = document.querySelectorAll(".itemQuantity");
   let totalQuantity = 0;
   for (var i = 0; i < itemsQuantity.length; i++) {
      let value = itemsQuantity[i].value;
      totalQuantity += parseInt(value)
   }

   cartQuantity.innerText = totalQuantity


   ////////////total price
   let cartPrice = document.getElementById("totalPrice")

   let totalPrice = 0;

   //let productdata = []
   for (let i = 0; i < basket.length; i++) {
      let localproduct = basket[i];
      let basketElements = productsInStorage.find((e) => e._id == localproduct.id);
      totalPrice += itemsQuantity[i].value * basketElements.price
   }

   cartPrice.innerText = totalPrice


}

quantityAndpriceUpdate()


/**
 * REGEX FOR THE FORM ARE IN FILE 
 */

regexForm();


/************************************************************************************************
 *                                                                                               
 *     
 *                                         ORDER 
 *                               
 * 
 *
 ************************************************************************************************/


//INITIALIZING the html elemment of the form
let form = document.querySelector(".cart__order__form");
//INITIALIZING the html element for the order action (button)
let orderFormBtn = document.querySelector('#order');

orderFormBtn.addEventListener('click', function (e) {
   e.preventDefault();
   //if an erreor occurs in any inputs
   if (validEmail(form.email) == false || validfirstName(form.firstName) == false || validlastName(form.lastName) == false || validaddress(form.address) == false || validcity(form.city) == false) {
      alert("veuillez corriger le(s) champs invalide(s)");
   }
   //if the basket is empty
   else if (basket === null || basket == 0) {

      //an alert appears to alarm the client
      alert("votre panier est vide");
      //confirmation of the redirection to the home page
      if (confirm(("souhaitez-vous effectuer votre choix?")) == true);
      window.location.href = "./index.html";
      //add  areload here for the page

   }
   //if the basket is not empty  and there's no errors in the form ,confirm your order
   else {

      // creating a new array from saved products,the final Basket
      let product_id = [];
      //pushing the id of every items from the local saved "basket" into the "final basket "
      for (let i = 0; i < basket.length; i++) {
         product_id.push(basket[i].id);
      }

      // linking user's info and products as the new data to exploits

      const order = {
         contact: {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            city: form.city.value,
            email: form.email.value

         },
         products: product_id

      };
      console.log(order)

      if ((confirm("confirmez-vous votre commande?") == true)) {



         ////posting data to the back-end

         //setting the options (method,headers and stringyfing the previous object)

         const options = {
            method: 'POST',

            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
            },

            body: JSON.stringify(order),

         };

         //fetching the order url with the options
         fetch("http://localhost:3000/api/products/order", options)
            .then(res => res.json())
            .then(datas =>

               // redirecting the client to the confirmation page with the fetched orderId
               window.location.href = "confirmation.html?orderId=" + datas.orderId



            );

      }

      else {

         (confirm("souhaitez-vous redirigé vers la page d'accueil?") == true)

         window.location.href = "./index.html";

      }



   }


})



