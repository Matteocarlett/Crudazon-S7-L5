const CRUDAZON_URL = "https://striveschool-api.herokuapp.com/api/product/";

let productID = new URLSearchParams(window.location.search).get('productID')

const deleteProduct = async () => {

    let response = await fetch(CRUDAZON_URL + productID, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmYxYTJjNmEwZDAwMTg0OTVlNTYiLCJpYXQiOjE3MDIxMjk0MzQsImV4cCI6MTcwMzMzOTAzNH0.SeUbswiWgUmJZl7ZVRKe1AJhNNReEvgwgwCikF4jQFo"
        }
    })

    console.log(response);

    if (response.ok) {
        alert('PRODOTTO ELIMINATO CORRETTAMENTE');
        window.location.replace('./index.html');
    } else {
        alert("PROBLEMA NELL'ELIMINAZIONE DEL PRODOTTO");
    }
}

const exists = async () => {
    try {
        let response = await fetch(CRUDAZON_URL + productID, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmYxYTJjNmEwZDAwMTg0OTVlNTYiLCJpYXQiOjE3MDIxMjk0MzQsImV4cCI6MTcwMzMzOTAzNH0.SeUbswiWgUmJZl7ZVRKe1AJhNNReEvgwgwCikF4jQFo"
            }
        })

        if (response.ok) {
            console.log('Il prodotto esiste! Status code:', response.status);
            let prodotto = await response.json();
            console.log('Hai ottenuto: ', prodotto);
            document.getElementById('name').value = prodotto.name
            document.getElementById('description').value = prodotto.description
            document.getElementById('brand').value = prodotto.brand
            document.getElementById('imageUrl').value = prodotto.imageUrl
            document.getElementById('price').value = prodotto.price

            let btnDelete = document.getElementById('delete');
            btnDelete.addEventListener('click', () => {
                if (window.confirm('Vuoi davvero eliminare il prodotto?')) {
                    deleteProduct();
                }
                else alert('Prodotto NON eliminato!');
            })
        }
        else {
            return new Error('Errore nella gestione della chiamata');
        }

    }
    catch (error) {
        console.log(error);
    }
}

if (productID) {
    exists();
}

const saveProduct = async function (newProduct) {
    try {

        let completeURL = productID ? CRUDAZON_URL + productID : CRUDAZON_URL;

        let response = await fetch(completeURL, {
            method: productID ? 'PUT' : 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NmYxYTJjNmEwZDAwMTg0OTVlNTYiLCJpYXQiOjE3MDIxMjk0MzQsImV4cCI6MTcwMzMzOTAzNH0.SeUbswiWgUmJZl7ZVRKe1AJhNNReEvgwgwCikF4jQFo",
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            if (!window.confirm('Prodotto aggiunto correttamente! Desideri aggiungere altri prodotti?')) {
                alert('Verrai rendirizzato alla homepage.');
                window.location.assign("/index.html");

            }
        } else {
            alert("PROBLEMA NELLA CREAZIONE DEL PRODOTTO")
        }
    } catch (error) {
        console.log(error)
    }
}

let formReference = document.getElementById('form');
formReference.addEventListener('submit', (ev) => {
    ev.preventDefault()
    let newProduct = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        brand: document.getElementById('brand').value,
        imageUrl: document.getElementById('imageUrl').value,
        price: document.getElementById('price').value
    }

    console.log('Prodotto che hai appena inserito ', newProduct);


    saveProduct(newProduct);

});