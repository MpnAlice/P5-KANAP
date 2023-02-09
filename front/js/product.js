import { productUrl, id, queryString_url } from "./utils.js";
//fetching the product's info from the new url 


/**
 * try and catch function  to prevent errors
 */

let product = ""
const fetchProduct = async () => {
    if (product) {
       return product
    }

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

 /**
  * implementing the elements 
  */

async function implementingProduct() {
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
     * ADDING ELEMENTS TO CART
     */
   
    
    // setting the options of the selection elements in a function
    const quantity = document.getElementById('quantity')

    const colorChoice = document.getElementById('colors');

    //initializing the button element present in the html
    const addToCartBtn = document.querySelector('#addToCart')
    addToCartBtn.addEventListener("click", (event) => {

        event.preventDefault();

        const selectedColor = colorChoice.options[colorChoice.selectedIndex].value
        const selectedQuantity = parseInt(quantity.value)
        //

        if ( selectedQuantity > quantity.max || selectedQuantity < quantity.min || selectedQuantity <= 0) {
            alert("veuillez  choisir une quantité comprise entre 1 et 100  pour votre produit")

        }

        if (selectedColor == "") {
            alert("veuillez indiquer une couleur pour votre produit")

        }


        if (selectedColor !== "" && selectedQuantity > 0 && selectedQuantity <= 100 && Number.isInteger(selectedQuantity)) {

            let obj = {
                id: product._id,
                color: selectedColor,
                quantity: selectedQuantity,

            }
            console.log(obj)



            let basket = JSON.parse(localStorage.getItem("localproduct")) || [];
           
            if (basket) {

                //  findind the product in local storage who have the same id and color as the product to add
                
                const foundProduct = basket.find((elt) => {return elt.id ===obj.id && elt.color === obj.color} )

                // setting a new auntity for the product euqla to the sum of the array from the local storage 
                // and the product we want to add
                if (foundProduct) {
                    // the obj .quantity is the same as the fround product
                    let addQuantity = parseInt(obj.quantity) + parseInt(foundProduct.quantity)

                    if (addQuantity <= 100) {
                        foundProduct.quantity = addQuantity

                        localStorage.setItem("localproduct", JSON.stringify(basket))

                        alert("La quantité de votre produit a bien été mise à jour");

                       if (confirm("souhaitez- vous accéder au panier?") == true) {
                            window.location.href = "./cart.html";
                        }
                        else{
                            if(confirm("souhaiter vous découvrir d'autres articles?")==true){
                                window.location.href = "./index.html";
                            }
                        }
                    
                    }

                    else {
                        alert(" la quantité du produit ne peut pas excéder 100");
                    }
                }


                else {
                 // pushing the elements in the basket  when they are new
                basket.push(obj)
                localStorage.setItem("localproduct", JSON.stringify(basket))
                alert("votre nouvel article a bien été ajouté au panier")

                if (confirm("souhaitez- vous accéder au panier?") == true) {
                    window.location.href = "./cart.html";
                }
               
                
            }


            }
        }
    })
    
};

implementingProduct()

