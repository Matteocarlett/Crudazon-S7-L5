const CRUDAZON_URL = "https://striveschool-api.herokuapp.com/api/product/";

const hideSpinner = () => {
    document.getElementById('spinner').classList.add('d-none');
}
const displayProducts = (results) => {
    let rowReference = document.getElementById('row');
    results.forEach(product => {

        let xCard = document.createElement('div');

        xCard.classList.add('col', 'my-3');
        xCard.innerHTML =
            `<div class="card h-100 shadow">
            <div class="row align-items-center">
                <div class="col-sm-5">
                    <img src="${product.imageUrl}" class="img-fluid" alt="${product.name}">
                </div>
                <div class="col-sm-7 h-100" >
                    <div class="card-body h-100">
                        <h5 class="card-title">${product.brand} ${product.name}</h5>
                        
                        <p class="card-text text-primary"> €${product.price}</p>
                        <p class="card-text text-end"> 
                                <a href="./backoffice.html?productID=${product._id}" class="btn btn-warning">MODIFICA</a>
                                <a href="./info.html?productID=${product._id}" class="btn btn-info">INFO</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>`
        rowReference.appendChild(xCard);
    });
}

const getProducts = async () => {
    try {
        let response = await fetch(CRUDAZON_URL, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmYxYTJjNmEwZDAwMTg0OTVlNTYiLCJpYXQiOjE3MDIxMjk0MzQsImV4cCI6MTcwMzMzOTAzNH0.SeUbswiWgUmJZl7ZVRKe1AJhNNReEvgwgwCikF4jQFo"
            }
        })

        if (response.ok) {
            console.log('Connessione avvenuta! Status code:', response.status);
            let results = await response.json();
            console.log('Hai ottenuto: ', results);
            hideSpinner();
            displayProducts(results);
        }
        else {
            return new Error('Errore nella gestione della chiamata');
        }
    }
    catch (error) {
        console.log(error);
    }
}

getProducts();
