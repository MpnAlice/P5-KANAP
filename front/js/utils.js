/**
 * VARIABLES
 */

//api's url
export const apiUrl = 'http://localhost:3000/api/products';
//extracting the id of the product from the end of the url's page
export const queryString_url = window.location.search
// easy method to separate the id from the string
export const id = queryString_url.slice(4)
//products's url
export const productUrl = (`http://localhost:3000/api/products/${id}`);

//

/**
 * FUNCTIONS
 */

//function to create elements 
export function createElement(type, attributes) {
    var element = document.createElement(type);
    for (var key in attributes) {
        if (key == "class") {
            element.classList.add(element.classList, attributes[key]);
        }
        else {
            element[key] = attributes[key]
        }
    }
    return element
}
