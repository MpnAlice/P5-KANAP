export const apiUrl = 'http://localhost:3000/api/products'//data's api
 //simplified fetching function on api's url
export async function getData(){                         
    const response = await fetch(apiUrl)
    const data = await response.json();
}