import { productUrl, id, queryString_url } from "./utils.js";
//fetching the product's info from the new url 

let product = ""
const fetchProduct = async () => {
    if (product) {
       return product
    }
 
    //the products are elements of  api
    try {
       const response = await fetch(productUrl);
       product = await response.json();
       return product
    }
 
    //if there's an error in retrieving the datas,an alert will appear
    catch (error) {
       alert("une erreur est survenue lors du chargment de votre produit")
 
    }
 }
 

 fetchProduct()





async function getProduct() {
    const response = await fetch(productUrl)
    const product = await response.json();
    //making image
    const ProductImage = document.createElement('img');
    ProductImage.src = product.imageUrl;
    ProductImage.alt = product.altTxt;
    const url = product.imageUrl
    const imgParent = document.querySelector('.item__img');
    imgParent.appendChild(ProductImage);
    //adding Name
    const productName = document.querySelector('#title');
    productName.innerText = product.name;
    const name = product.name;
    //adding Price
    const productPrice = document.querySelector('#price');
    productPrice.innerText = product.price;

    //adding Description
    const productDescription = document.querySelector('#description');
    productDescription.innerText = product.description;

    //colors
    const colorSelection = document.querySelector('#colors');
    let colorsPalette = product.colors;
    //looping through color array to:
    colorsPalette.forEach(color => {
        //create "option" tag in the DOM
        const colorOption = document.createElement("option");
        colorSelection.appendChild(colorOption);
        // setting element(s) of the array as value
        colorOption.value = color
        // setting element(s) of the array as html element
        colorOption.innerHTML = color
    });


    /**
     * 
     * adding to cart
     */

    //initializing the button element present in the html
    const addToCartBtn = document.querySelector('#addToCart')
    // setting the options of the selection elements in a function
    const quantity = document.getElementById('quantity')

    const colorChoice = document.getElementById('colors');


    addToCartBtn.addEventListener("click", (event) => {

        event.preventDefault();

        const selectedColor = colorChoice.options[colorChoice.selectedIndex].value
        const selectedQuantity = parseInt(quantity.value)
        //

        if (selectedColor == "" || selectedQuantity > quantity.max || selectedQuantity < quantity.min || selectedQuantity <= 0) {
            alert("veuillez  choisir une quantité comprise entre 1 et 100 ainsi qu'une couleur pour votre produit")

        }

        if (selectedColor !== "" && selectedQuantity > 0 && selectedQuantity <= 100 && Number.isInteger(selectedQuantity)) {

            let obj = {
                id: product._id,
                color: selectedColor,
                quantity: selectedQuantity,

            }
            console.log(obj)



            let basket = JSON.parse(localStorage.getItem("localproduct")) || [];
            const foundProduct = basket.find(
                (elt) =>
                    elt.id == obj.id && elt.color == obj.color);


            if (basket) {

                if (foundProduct) {
                    // the obj .quantity is the same as the fround product
                    let addQuantity = parseInt(obj.quantity) + parseInt(foundProduct.quantity)
                    foundProduct.quantity = addQuantity
                }

                
                basket.push(obj)
                localStorage.setItem("localproduct", JSON.stringify(basket))
                alert("votre nouvel article a bien été ajouté au panier")


                if (confirm("souhaitez- vous accéder au panier?") == true) {
                    window.location.href = "./cart.html";
                }
                //else {
                   // (confirm("d'accord, souhaitez-vous continuer vos achats ?") == true)
                   // window.location.href = "./index.html";
    
                //}



            }
        }
    })
    //
};

getProduct()

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



