import { createElement } from "./utils.js";

/**
 * CONSTANTS USED IN PRODUCT'S FILE
 */

//extracting the id of the product from the end of the url's page
const queryString_url = new URLSearchParams(window.location.search);
// easy method to separate the id from the string
export const productId = queryString_url.get("id");
//products's url
export const productUrl = `http://localhost:3000/api/products/${productId}`;

// retrieving product data with the new url
function fetchingDtata() {
  fetch(productUrl)
    .then((res) => res.json())
    .then((data) => {
      displayProductInfos(data);
    })

    //if the retrieval is not possible,an alert will appear

    .catch((err) => {
      alert(
        "une erreur est survenur lors de la récupération de vos données depuis l'API"
      );
    });
}

//calling the function
fetchingDtata();

//implementing product's data
// with the use of the params, all thE DATA  are only for one product

function displayProductInfos(data) {
  //PRODUCT's

  ///IMAGE

  const ProductImage = createElement("img");
  ProductImage.src = data.imageUrl;
  ProductImage.alt = data.altTxt;
  const url = data.imageUrl;
  const imgParent = document.querySelector(".item__img");
  imgParent.appendChild(ProductImage);

  //NAME
  const productName = document.querySelector("#title");
  productName.innerText = data.name;
  const name = data.name;
  //PRICE
  const productPrice = document.querySelector("#price");
  productPrice.innerText = data.price;

  //DESCRIPTION
  const productDescription = document.querySelector("#description");
  productDescription.innerText = data.description;
  //colors
  const colorSelection = document.querySelector("#colors");
  let colorsPalette = data.colors;

  //looping through color array to:
  colorsPalette.forEach((color) => {
    //create "option" tag in the DOM
    const colorOption = createElement("option");
    colorSelection.appendChild(colorOption);
    // setting element(s) of the array as value
    colorOption.value = color;
    // setting element(s) of the array as html element
    colorOption.innerHTML = color;
  });

  getSelectedProduct(data);
}

/**
 * FUNCTION TO GET THE PRODUCT WITH HIS OPTIONS
 */

function getSelectedProduct(data) {
  //initializing the add to cart button
  const addToCartBtn = document.querySelector("#addToCart");
  addToCartBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // html elements value  for color and quantity stored in variable
    const colors = document.querySelector("#colors");
    const itemQuantity = document.getElementById("quantity");

    // setting the options of the selection elements in a function
    const selectedQty = parseInt(itemQuantity.value);
    const selectedColor = colors.value;
    //

    /**
     * SETTING OPTIONS CONDITIONS
     */

    // if the selected quantity is superior to max and inferior to min
    //an alert will appear
    if (
      selectedQty > quantity.max ||
      selectedQty < quantity.min ||
      selectedQty <= 0
    ) {
      alert(
        "veuillez  choisir une quantité comprise entre 1 et 100  pour votre produit"
      );
    }

    //if there's no selected color, an alert appears

    if (selectedColor == "") {
      alert("veuillez indiquer une couleur pour votre produit");
    }

    //if the selected color is different from empty, the quantity is superior to 0 ,inferior or eaqual to 100, or is a whole number,so not negativ
    if (
      selectedColor !== "" &&
      selectedQty > 0 &&
      selectedQty <= 100 &&
      Number.isInteger(selectedQty)
    ) {
      // creating an obj used  to carry all the selected product
      //information;this obj will be send to the localstorage

      let obj = {
        id: data._id,
        color: selectedColor,
        quantity: selectedQty,
      };

      ///////////////////////////////////////////////initializing the local storage
      let basket = JSON.parse(localStorage.getItem("products")) || [];
      ////////////////////////////////////////////////looking for product in the basket with the same color and id as the obj;going through the basket's array in the loclastorage
      const foundProduct = basket.find((elt) => {
        return (elt.id === obj.id) & (elt.color === obj.color);
      });
      ///////////////////////////////////IF THE PRODUCT IS ALREADY IN THE BASKET //////////////
      if (foundProduct) {
        let newQuantity =
          parseInt(foundProduct.quantity) + parseInt(obj.quantity);

        ////IF THE NEW QUANTITY OF THE FOUND PRODUCT IS INFERIOR OR EQUAL TO 100
        ///THE QUANTITY WILL BE UPDATED
        ///THE USER CAN CHOOSE TO GO BACK TO THE HOME PAGE
        if (newQuantity <= 100) {
          foundProduct.quantity = newQuantity;
          localStorage.setItem("products", JSON.stringify(basket));
          // The product's quantity is updated
          alert(
            `la quantité de l'article   ${data.name}, de couleur ${obj.color}, a été mise à jour`
          );

          if (confirm("souhaitez-vous découvrir d'autres articles?") == true) {
            window.location.href = "./index.html";
          }
          /////THE USER CAN CHOOSE TO GO TO THE CART PAGE
          else {
            if (confirm("souhaitez-vous accéder au panier?") == true) {
              window.location.href = "./cart.html";
            }
            ///THE USER STAY ON THE SAME PAGE
            else {
              window.location.reload();
              alert(
                `le produit   ${data.name} a l'air de vous plaire,nous en sommes ravis!`
              );
            }
          }
        }
        // THE TOTAL PRODUCT QUANTITY IS SUPERIOR TO 100
        if (newQuantity > 100) {
          alert(
            "la quantité totale de votre article va dépasser le maximun autorisé,nous vous invitons à la modifier"
          );
        }
      }

      ///////////////////////////////////IF THE PRODUCT IS NEW/////////////////////////////////
      else {
        // pushing the new element in basket
        basket.push(obj);
        alert(
          `le nouvel article ${data.name}  de couleur  ${obj.color} a été ajouté au panier`
        );
        // saving the element in the localstorage
        localStorage.setItem("products", JSON.stringify(basket));
        //proposing to choose other elements
        if (confirm("souhaitez-vous découvrir d'autres articles?") == true) {
          window.location.href = "./index.html";
        } else {
          //proposing access to cart
          if (confirm("souhaitez-vous accéder au panier?") == true) {
            window.location.href = "./cart.html";
          } else {
            // Staying on the same page
            window.location.reload();
            alert(`vous êtes toujours sur la page du produit ${data.name} `);
          }
        }
      }
    }
  });
}
