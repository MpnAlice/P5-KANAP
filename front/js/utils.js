export const apiUrl = 'http://localhost:3000/api/products'

export async function getData(){
    const response = await fetch(apiUrl)
    const data = await response.json();
    console.log(data)

}