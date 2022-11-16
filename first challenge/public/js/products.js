const productsApi = {

    get: async () => {
        const res = await fetch('/api/products',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        console.log(data.data);
        return makeHtml(data.data)
    },


    delete: (id) => {
        const options = {
            method: 'DELETE'
        }
        return fetch(`/api/products/${id}`, options)
    },

    put: (id, newProduct) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return fetch(`/api/products/${id}`, options)
    },

    post : (newProduct) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        }
        return fetch('/api/products', options)
    }
        
}

productsApi.get()

const makeHtml = (data) => {
    const container = document.getElementById('container')
    let html = ''
    data.map( product =>{
        html += `
        <div class="card" style="width: 16rem;">
            <img src=${product.url} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <button onClick="deleteById(${product.id})" class="btn btn-danger">delete!</button>
                <button type="button" onClick="updateById(${product.id})" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    update!
                </button>
                <button onClick="addProduct(${product.id})" class="btn btn-primary mt-3">Add to Cart</button>

                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Update a product</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="formUpdate" action="">
                                    <div class="my-3">
                                        <label class="form-label" for="">Name</label>
                                        <input id="nameU" name="name" class="form-control" type="text" placeholder="Name..." value="${product.name}" required>
                                    </div>
                
                                    <div class="my-3">
                                        <label class="form-label" for="">Description</label>
                                        <input id="descriptionU" name="description" class="form-control" type="text" placeholder="Description..." required>
                                    </div>
                
                                    <div class="my-3">
                                        <label class="form-label" for="">Price</label>
                                        <input id="priceU" name="price" class="form-control" type="number" placeholder="Price..." required>
                                    </div>
                
                                    <div class="my-3">
                                        <label class="form-label" for="">Url</label>
                                        <input id="urlU" name="url" class="form-control" type="text" placeholder="Url..." required>
                                    </div>
                
                                    <div class="my-3">
                                        <label class="form-label" for="">Stock</label>
                                        <input id="stockU" name="stock" class="form-control" type="number" placeholder="Stock..." required>
                                    </div>
                
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" onClick="updateClick()" class="btn btn-success">Save changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    })
    container.innerHTML = html
}

const deleteById = (id) => {
    productsApi.delete(id)
    .then(productsApi.get())
}

const updateById = (id) => {
    console.log(id);
    renderUpdateForm(id)
    //WITH THE FORM
}

const form = document.getElementById('form')
form.addEventListener('submit', (e)=> {
    e.preventDefault()
    let name = document.getElementById('name').value
    let description = document.getElementById('description').value
    let price = document.getElementById('price').value
    let url = document.getElementById('url').value
    let stock = document.getElementById('stock').value

    const newProduct = formValues(name, description, url, price, stock)
    productsApi.post(newProduct).then(productsApi.get())
    form.reset()
    console.log(newProduct);

})

const formValues = (name, description, price, url, stock) => {
    const newProduct = {
        name,
        description,
        price,
        url,
        stock
    }
    return newProduct
}

const renderUpdateForm = async (id) => {
    const formUpdate  = document.getElementById('formUpdate')
    formUpdate.addEventListener('submit', (e) => {
        e.preventDefault()
        let name = document.getElementById('nameU').value
        let description = document.getElementById('descriptionU').value
        let price = document.getElementById('priceU').value
        let url = document.getElementById('urlU').value
        let stock = document.getElementById('stockU').value
        const newProduct = updateClick(id,name,description,price,url,stock)
        productsApi.put(id, newProduct).then(productsApi.get())
        console.log(newProduct);
    })
}

const updateClick = (id,name,description,price,url,stock) => {
    const newProduct = {
        id,
        name,
        description,
        price,
        url,
        stock
    }
    return newProduct
    
}
