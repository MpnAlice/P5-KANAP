//basket functions
const basket = [{title: "Un premier produit", quantity: 2}];




    function getCart() {
        //sérialisation:passer une donnée complexe à une chaîne de caractères,d'où l'utilisation de json.
        let basket = localStorage.getItem("basket");
        if (cart == null) {
            return [];
        } else {
            return JSON.parse(basket);
        }
    }
    //save to cart
    function saveCart(basket) {
        localStorage.setItem("basket", JSON.stringify(basket));
    }

    //add product to cart
    function addToCart(product) {
        let basket = getCart();
        let foundProduct = basket.find(p => p.id == product.id)

        if (foundProduct != undefined) {
            foundProduct.quantity++;
        }
        else {
            product.quantity = 1;
            basket.push(item);
        }

        saveCart(basket);
    }

    // change quantity
    function ChangeQuantity(product, quantity) {
        let cart = getCart();
        let foundProduct = cart.find(p => p.id == product.id)

        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                removeFromCart(foundProduct);
            }
            else {
                saveCart(cart);
            }
        }

    }
    

    //
    for(let i=0; i < basket.length; i++){

        const basketId = basket[i].id
        const basketImg = basket[i].url;
        const basketName = basket[i].name;
        const basketColor = basket[i].color
        const basketPrice = basket[i].price
       
     //selecting the html element in which products will nest
     const cart = document.querySelector('#cart__items')
        
     //adding elements in the DOM with "document.createElement()", ".appendChild", "innerHTML" and ".setAttributes" :
    
     //article
     const article = document.createElement('article');
     article.setAttribute("class", "cart__item");
     article.dataset.id =`${basketId}`
     article.dataset.color =`${basketColor}`
     article.setAttribute("data-color", ` ${basketColor}`);
     cart.appendChild(article)
    
    
     // img
     const imgContainer = document.createElement('div');
     imgContainer.setAttribute("class", "cart__item__img")
     article.appendChild(imgContainer)
     //
     const productImg = document.createElement('img');
     imgContainer.appendChild(productImg);
     productImg.src = basketImg
    
     
     //content
     const productContent = document.createElement('div');
     productContent.setAttribute("class", "cart__item__content");
     article.appendChild(productContent)
     //description
     const description = document.createElement('div');
     description.setAttribute("class", "cart__item__content__description");
     productContent.appendChild(description);
     description.innerHTML = `
     <h2>${basketName}</h2>
     <p>${basketColor}</p>
     <p>${basketPrice} €</p>
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
     //quantityInput.setAttribute("value", `${basketQuantity}`);
    
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
    
    }


    ///
    
    let changeInputs = document.getElementsByClassName('.itemQuantity');
    for(var i=0; i < changeInputs.length; i++){
       var input = changeInputs[i]
       input.addEventlistener('change', quantityChanged)
     
    }

    function quantityChanged(event){
       var input = event.target
       if(isNan(input.value) || input.value <= 0){
          input.value =1
       }
    }
    

    //delete button
    const deleteSettings = document.createElement('div');
    deleteSettings.setAttribute("class", "cart__item__content__settings__delete");
    settings.appendChild(deleteSettings);
    //
    const deletebtn = document.createElement('p');
    deletebtn.setAttribute("class", "deleteItem");
    deletebtn.innerHTML = `Supprimer `;
    deleteSettings.appendChild(deletebtn);
    //If the button is clicked,change the quantity,and the total
    //total quantity
    let totalBasketQuantity = 0
    for (let i=0; i< localProduct.length ; i++)
    {
       totalBasketQuantity+= parseInt(localProduct[i].quantity);
    }
    document.querySelector('#totalQuantity').innerText = totalBasketQuantity
    //
    
    
    
 