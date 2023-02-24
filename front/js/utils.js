/**
 * API's url
 */

export const apiUrl = "http://localhost:3000/api/products";

export const items = document.querySelectorAll("items");

// setting the options of the selection elements in a function
export const quantity = document.getElementById("quantity");

export const colors = document.getElementById("colors");

/**
 * FUNCTIONS
 */

//function to create elements
export function createElement(type) {
  var element = document.createElement(type);
  return element;
}
