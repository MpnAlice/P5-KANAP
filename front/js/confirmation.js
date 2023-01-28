// setting the params to get the order id
const params = new URLSearchParams(window.location.search)
// getting the id from the page's url
const orderiD = params.get('orderId')

// displaying the order's id to the confirmation's page by
//calling the html's element

let confirmation = document.getElementById('orderId')

//adding the id in the DOM
confirmation.innerText = orderiD
