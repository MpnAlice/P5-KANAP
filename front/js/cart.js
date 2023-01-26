import { apiUrl } from "./utils.js" ;
import { regexForm, validEmail,validaddress,validcity,validfirstName,validlastName } from "./regexForm.js";
//getting the basket from the local storage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket)
//
async function getData() {
   const response = await fetch(apiUrl)
   //API LIST  .
   const data = await response.json();

   for (let product of basket) {
      let basketQuantity = product.quantity
      const basketId = product.id
      const basketColor = product.color;
      //finding elements who have the same id as tle local elements and retrieveing those data
      const basketElements = data.find((element) => element._id === basketId);

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
     <p>${basketElements.price}€</p>
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
   }

   //////////MODIFICATION OF THE TOTALS  BY CHANGING QUANITY OR REMOVING ITEMS

   /////////remove items with the delete button
   var removeBtn = document.getElementsByClassName('deleteItem');
   for (var i = 0; i < removeBtn.length; i++) {
      var button = removeBtn[i]
      button.addEventListener('click', function (event) {
         var buttonCliked = event.target
         if (confirm("voulez-vous supprimer cet article ?") == true) {
            //getting on click de dataset of the removed article
            let removediD = buttonCliked.closest('article').dataset.id;
            let removedColor = buttonCliked.closest('article').dataset.color;

            //setting the data of the new filtered basket
            basket = basket.filter(e => e.id !== removediD && e.color !== removedColor)
            localStorage.setItem("basket", JSON.stringify(basket));
            //
         }

         buttonCliked.closest('article').remove();
         //reloading after deleting the item
         window.location.reload()

      })
   }

   function changeQuantity() {
      /////////change quantity with the input
      const quantitySelector = document.getElementsByClassName("itemQuantity");

      for (var i = 0; i < quantitySelector.length; i++) {
         var input = quantitySelector[i];
         let item = basket[i];
         input.addEventListener("change", (e) => {
            e.preventDefault;
            //
            let newValue = input.value

            //the value is equal under 0 or is not a number

            if (isNaN(newValue) || newValue <= 0) {
               alert("veuillez renseigner une quantité correcte!")
            }

            // the new value is != from 0 //correct the bug here
            if (newValue <= 100) {
               item.quantity = newValue
               alert("la quantité de cet article a bien été modifiée")
            }
            localStorage.setItem("basket", JSON.stringify(basket))

            //reloading after adding the item
            window.location.reload()


         }
         )
      }
   }
   changeQuantity()

   function quantityAndprice() {
      ////////////total quantity
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
         let item = basket[i];
         let basketElements = data.find((e) => e._id == item.id);
         totalPrice += itemsQuantity[i].value * basketElements.price
      }

      cartPrice.innerText = totalPrice


   }

   quantityAndprice();

   
}
getData();

regexForm();

//////////////ORDER

 let form = document.querySelector(".cart__order__form");

 let orderFormBtn = document.querySelector('#order');

 orderFormBtn.addEventListener('click',function(e){
   e.preventDefault();
   //
   if (basket=[] ) {
     alert("votre panier est vide")
     if(confirm(("souhaitez-vous effectuer votre choix?")) == true)
     window.location.href ="./index.html"

   } else {
      
   }
 })



   
 //if (basket === null || basket == [] || basket == 0) {
   //confirm(('votre panier est vide,souhaitez-vous effectuer votre choix?')==true)
  // window.location.href ="./index.html"
   
 

 //if (
  // (validEmail(form.email) &&
  // validfirstName(form.firstName) &&
  // validlastName(form.validName) &&
  // validaddress(form.address) &&
  // validcity(form.city))
  // === true) {
  // (confirm('confirmez-vous votre commande?') === true)


   


