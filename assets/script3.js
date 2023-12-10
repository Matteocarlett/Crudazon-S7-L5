let productID = new URLSearchParams(window.location.search).get('productID');
const CRUDAZON_URL = "https://striveschool-api.herokuapp.com/api/product/";

const productDetail = async () => {

    try {
        let response = await fetch(CRUDAZON_URL + productID, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmYxYTJjNmEwZDAwMTg0OTVlNTYiLCJpYXQiOjE3MDIxMjk0MzQsImV4cCI6MTcwMzMzOTAzNH0.SeUbswiWgUmJZl7ZVRKe1AJhNNReEvgwgwCikF4jQFo"
            }
        })
        if (response.ok) {
            console.log('Connessione avvenuta!');
            let product = await response.json();
            console.log('prodotto:', product);
            console.log(product.imageUrl);
            let productImageReference = document.getElementById('productImage');
            let productImage = document.createElement('img');
            productImage.setAttribute('src', product.imageUrl);
            productImage.classList.add('w-100');
            productImageReference.appendChild(productImage);
            let productInfoReference = document.getElementById('productInfo');
            productInfoReference.innerHTML = `
                    <h2>${product.brand} - ${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: €${product.price}</p>
                    <p>Image Url: <br> ${product.imageUrl}</p>
                    <p>SERVER GENERATED: </p>
                    <ul>
                        <li>createdAt: ${product.createdAt}</li>
                        <li>updatedAt: ${product.updatedAt}</li>
                        <li>userId: ${product.userId}</li>
                        <li>_v: ${product.__v}</li>
                        <li>_id: ${product._id}</li>
                    </ul>`
        }
        else {
            return new Error('Errore nella gestione della chiamata');
        }
    }
    catch (error) {
        console.log(error);
    }

}

productDetail();