/**
 * VARIABLES
 */

//api's url
export const apiUrl = 'http://localhost:3000/api/products';
//extracting the id of the product from the end of the url's page
export const queryString_url = new URLSearchParams(window.location.search)
// easy method to separate the id from the string
export const paramId = queryString_url.get("id")
//products's url
export const productUrl = (`http://localhost:3000/api/products/${paramId}`);

//
export const  items= document.querySelectorAll("items")

/**
 * FUNCTIONS
 */

//function to create elements 
export function createElement(type) {
    var element = document.createElement(type)
    return element
}
