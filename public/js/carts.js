

const cartApi = {
    get: async () => {
        const res = await fetch('/api/cart',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        })
        const data = await res.json()
        return console.log('array of carts',data.data);
    },

    post: () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }    
        }
        return fetch('/api/cart',options)
        .then(data => data.json())
        .then(res => res.data)
    },

    add: (idCart, idProd) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }    
        }
        return fetch(`/api/cart/${idCart}/products/${idProd}`,options)
    }

    
}

const createCart = async () => {
    cartApi.get()
    const res = await cartApi.post();
    return res;
}


//CLICK BUTTON ADD TO CART, RECIBE THE ID OF THE PRODUCT
const  addProduct  = async (id) => {
    let idCart = await createCart()
    console.log('que es esto', idCart);
    console.log('id producto',id);
    let añadirproducto = await cartApi.add(idCart,id)
    console.log(añadirproducto);
    
}


