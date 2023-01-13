  
    //basket functions
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

    //add to cart 
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