import { apiUrl, productUrl,paramId, createElement } from "./utils.js";
import { regexForm, validEmail, validaddress, validcity, validfirstName, validlastName } from "./regexForm.js";
let basket = JSON.parse(localStorage.getItem("localproduct")) || [];
console.log(basket)

let products = null;

const fetchProducts = async () => {
   if (products) {
      return products
   }
   try {
      const response = await fetch(apiUrl);
      products = await response.json();
      return products
   }
   catch (error) {
      alert("une erreur est survenue lors du chargment de vos produits")

   }
}

//
let localProducts = async() =>{
   const awaitBasket = await fetchProducts()
   const localBasket = basket;
   return localBasket.map((item) =>{
      const foundElements= awaitBasket.find((element) => element._id == item.id);
      return{
         ...item,
   
         ...foundElements,
      }
      
   })
 
}
//CREATING ELEMENTS IN CART 

let productsInStorage = await localProducts()
for (let product of productsInStorage){
    implementingProducts(product)
   
}
console.log(productsInStorage)

//

function implementingProducts(product) {

   let cart = document.getElementById('cart__items')

   //article
   const article = document.createElement('article');
   article.setAttribute("class", "cart__item");
   article.dataset.id = `${product._id}`
   article.dataset.color = `${product.color}`
   article.setAttribute("data-color", ` ${product.color}`);
   console.log(article)

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
   h2.innerText =product.name;
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
   changeQuantity(quantityInput)

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

   /////////remove items with the delete button
 function removeItems(){
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
            localStorage.setItem("localproduct", JSON.stringify(basket));
            //
            console.log(basket)
         }

         buttonCliked.closest('article').remove();
         //reloading after deleting the item
         window.location.reload()

      })

  
   }

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
         localStorage.setItem("localproduct", JSON.stringify(basket))

         //reloading after adding the item
         window.location.reload()


      }
      )
   }
}


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
      let basketElements = productsInStorage.find((e) => e._id == item.id);
      totalPrice += itemsQuantity[i].value * basketElements.price
   }

   cartPrice.innerText = totalPrice


}

quantityAndprice()


regexForm();



//////////////ORDER

let form = document.querySelector(".cart__order__form");

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
   else { //(confirm("confirmez-vous votre commande?") == true) 

      // creating a new array from saved products,thefinal Basket
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
})



