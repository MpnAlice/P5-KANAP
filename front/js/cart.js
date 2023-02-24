import { createElement } from "./utils.js";
import {
  regexForm,
  validEmail,
  validaddress,
  validcity,
  validfirstName,
  validlastName,
} from "./regexForm.js";

//initializing the localStorage with the products
let basket = JSON.parse(localStorage.getItem("products"));
// implementing the elements of the basket in the cart

/**
 *
 * RETRIEVING THE DATAS FROM THE API
 * WITH TRY  AND CATCH  blocks
 *
 */
const getProductDatas = async () => {
  // FIRST EXECUTE THE first statement which is fetch
  // then extract the  JSON OBJECT witch is the products array
  try {
    const response = await fetch("http://localhost:3000/api/products/");
    const products = await response.json();
    return products;
  } catch (error) {
    alert("Une erreur est survenue lors de la récupér");
  }
};

//calling the function
getProductDatas();
////////////FILTERING DATA by generating a new map of products sharing the same id ;
const localProducts = async () => {
  // list of products from api
  const productsData = await getProductDatas();
  //array of products selected,stored in locastorage
  const LocalProducts = JSON.parse(localStorage.getItem("products")) || [];
  // mapping
  return LocalProducts.map((productInStorage) => {
    const productsInCart = productsData.find(
      (product) => product._id == productInStorage.id
    );

    return {
      ...productInStorage,
      ...productsInCart,
    };
  });
};

//CALLING THE FUNCTION
localProducts();

/***********************************
 *IMPLEMENTING THE BASKET'S ELEMENTS
 **********************************/

const getCart = async () => {
  //IF THE BASKET IS EMPTY,
  if (basket === null || basket == 0) {
    //A TEXT IS DISPLAYED ON THE SCREEN TO INFORM THE USER
    let h1 = document.querySelector("h1");
    h1.innerText = "votre panier ne contient pas de produits";
  } else {
    /**
     * implementing the cart
     *
     */
    for (let i = 0; i < basket.length; i++) {
      const cart = document.getElementById("cart__items");

      //elemments of the local storage
      let dataForCart = await localProducts();
      console.log(dataForCart);

      /// adding the element's to the DOM for each items of the localstorage)
      // creating
      //article and setting de data-id and data-color
      const article = createElement("article");
      article.className = "cart__item";
      article.setAttribute("data-color", basket[i].color);
      article.setAttribute("data-id", dataForCart[i]._id);
      cart.appendChild(article);

      // image container and image
      const imgContainer = createElement("div");
      imgContainer.setAttribute("class", "cart__item__img");
      article.appendChild(imgContainer);
      //
      const productImg = createElement("img");
      imgContainer.appendChild(productImg);
      productImg.src = dataForCart[i].imageUrl;

      // description container and deproduct description

      const productContent = createElement("div");
      productContent.setAttribute("class", "cart__item__content");
      article.appendChild(productContent);
      //description
      const description = document.createElement("div");
      description.setAttribute("class", "cart__item__content__description");
      productContent.appendChild(description);

      ///descritption's elemment
      //the data are retrieved from
      //api
      let h2 = createElement("h2");
      h2.innerText = `${dataForCart[i].name}`;
      //loscalstorage because it is the selected color
      let p1 = createElement("p");
      p1.innerText = `${basket[i].color}`;
      //API because the price should not be in the
      //localstorage
      let p2 = createElement("p");
      p2.innerText = `${dataForCart[i].price}€`;

      //appending the description's element
      //to the descriptiion node parent
      let descriptionElement = [h2, p1, p2];
      descriptionElement.forEach((element) => {
        description.appendChild(element);
      });

      //settings
      const settings = document.createElement("div");
      settings.setAttribute("class", "cart__item__content__settings");
      productContent.appendChild(settings);

      // quantity
      const quantitySettings = document.createElement("div");
      quantitySettings.setAttribute(
        "class",
        "cart__item__content__settings__quantity"
      );
      settings.appendChild(quantitySettings);

      //
      const p = document.createElement("p");
      p.innerText = "Qté : ";
      quantitySettings.appendChild(p);
      //quantity input
      const quantityInput = document.createElement("input");
      quantityInput.setAttribute("class", "itemQuantity");
      quantityInput.setAttribute("type", "number");
      quantityInput.setAttribute("name", "itemQuantity");
      quantityInput.setAttribute("min", "1");
      quantityInput.setAttribute("max", "100");
      ///the qauntity is from the localstorage
      quantityInput.setAttribute("value", `${basket[i].quantity}`);
      quantitySettings.appendChild(quantityInput);

      //
      const deleteSettings = document.createElement("div");
      deleteSettings.className = "cart__item__content__settings__delete";
      settings.appendChild(deleteSettings);

      //
      const deletebtn = document.createElement("p");
      deletebtn.setAttribute("class", "deleteItem");
      deletebtn.innerHTML = `Supprimer `;
      deleteSettings.appendChild(deletebtn);
    }
    //Calling the functions
    deleteItem();
    getTotalQuantity();
    QuantityUpdate();
  }
};

//calling the functions
getCart();

/**
 *
 * CALCULATION OF THE TOTAL QUANTITY AND TOTAL PRICE OF THE CART
 *
 */

const getTotalQuantity = async () => {
  const itemsQuantity = document.querySelectorAll(".itemQuantity");

  let cartTotalPrice = 0;
  let cartTotalQuantity = 0;

  for (let i = 0; i < itemsQuantity.length; i++) {
    let value = itemsQuantity[i].value;
    cartTotalQuantity += parseInt(value);

    //prices are not stored in the localStorage,they are retrieved from
    //the products in API sharing the same id as the products in local storage
    let productList = await localProducts();
    cartTotalPrice += itemsQuantity[i].value * productList[i].price;
  }

  //implementing the result in html's element
  //PRICE
  document.querySelector("#totalPrice").innerHTML = cartTotalPrice;
  //QUANTITY
  document.querySelector("#totalQuantity").innerText = cartTotalQuantity;
};

/**
 *UPDATE OF THE QUANTITY ON CART PAGE
 *
 */

const QuantityUpdate = () => {
  const quantityInput = document.querySelectorAll(".itemQuantity");

  //LOOPING THROUGH the inputs html elements
  for (let i = 0; i < quantityInput.length; i++) {
    quantityInput[i].addEventListener("change", (e) => {
      e.preventDefault();

      let modifiedValue = quantityInput[i].value;
      //QUANTITY CONDITIONS

      if (modifiedValue > 0 && modifiedValue <= 100) {
        basket[i].quantity = modifiedValue;
        alert(" la quantité de votre article a bien été modifiée");
        localStorage.setItem("products", JSON.stringify(basket));
        window.location.reload();
      }

      /////**if the value is superior to 100
      if (modifiedValue > 100) {
        basket[i].quantity = modifiedValue;
        window.location.reload();
        alert(
          "désolé ,la quantité de votre article ne sera pas modifiée car la valeur indiquée est supérieure à 100"
        );
        ////if the value is under 0
      }

      if (modifiedValue <= 0) {
        basket[i].quantity = modifiedValue;
        window.location.reload();
        alert(
          "désolé ,la quantité de votre article ne sera pas modifiée car la valeur indiquée est inférieure ou égale à zéro"
        );
      }
    });
  }
};

/**
 *
 * DELETE ITEMS FROM THE CART
 */

const deleteItem = () => {
  const deleteBtn = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", (e) => {
      e.preventDefault();
      // CONFIRMATION ALERT BEFORE DELETIN GTHE PRODUCT
      if (confirm("Voulez-vous supprimer cet article du panier ? ") == true) {
        // THE REMOVED ITEM  SHOULD HAVE THE SAVE ID AS THE CLOSEST ARTICLE TO DELETE's button
        let closestId = deleteBtn[i].closest("article").getAttribute("data-id");
        console.log(closestId);
        let closestColor = deleteBtn[i]
          .closest("article")
          .getAttribute("data-color");
        //new array with products with different id and color
        let newBasket = basket.filter(
          (e) => e.id !== closestId || e.color !== closestColor
        );
        //SAVING TH NEW BASKET
        localStorage.setItem("products", JSON.stringify(newBasket));

        window.location.reload();
      }
    });
  }
};

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
let orderFormBtn = document.querySelector("#order");

orderFormBtn.addEventListener("click", function (e) {
  let basket = JSON.parse(localStorage.getItem("products")) || [];
  e.preventDefault();
  ///const to handle the regex
  const regexFalse =
    validEmail(form.email) == false ||
    validfirstName(form.firstName) == false ||
    validlastName(form.lastName) == false ||
    validaddress(form.address) == false ||
    validcity(form.city) == false;
  const allFalse =
    validEmail(form.email) == false &&
    validfirstName(form.firstName) == false &&
    validlastName(form.lastName) == false &&
    validaddress(form.address) == false &&
    validcity(form.city) == false;

  if (regexFalse | allFalse) {
    alert("veuillez renseigner vos coordonnées avant de passer commande ");
  } else {
    //if the basket is not empty  and there's no errors in the form ,confirm your order

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
        email: form.email.value,
      },
      products: product_id,
    };
    console.log(order);

    if (confirm("confirmez-vous votre commande?") == true) {
      ////posting data to the back-end

      //setting the options (method,headers and stringyfing the previous object)

      const options = {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(order),
      };

      //fetching the order url with the options
      fetch("http://localhost:3000/api/products/order", options)
        .then((res) => res.json())
        .then(
          (datas) =>
            // redirecting the client to the confirmation page with the fetched orderId
            (window.location.href =
              "confirmation.html?orderId=" + datas.orderId)
        );

      ///clearing the local storage after the order is sent!
      localStorage.clear();
    }

    /// ORDER ANNULATION
    else {
      // IF THE USER DOESN'T WAN TO PURSUIT THE ORDER

      if (confirm("souhaitez-vous annuler votre commande?") == true) {
        ///AN ALERT INFORMING THE USER THAT THE BASKET WILL BE DELETED
        alert("attention votre panier sera supprimé");

        // CLEARING THE STORAGE
        localStorage.clear();
        ///
        window.location.href = "./index.html";
      } else {
        // STAYING ON THE PAGE

        alert("vous êtes toujours sur la page panier");

        window.location.load();
      }
    }
  }
});
