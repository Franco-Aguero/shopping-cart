const utils = {
    activeStyle: (state, name) => {
        if(state === name) return "Active"
        
    },
    totalPriceCart: ( prop ) => {
        let costProduct = 0;
        prop.map( product => costProduct += parseInt(product.price) * parseInt(product.unit) )
        return costProduct
    }
}

export default utils;

/* const encontrador = product.detail_product.product.list.find( el => el.attributes_variants[0].id === state.variantes.talla.id)
const [state, setState] = useState({
    vTalle: 0, //variate de talle
    vColor:0,
    sku: encontrador.properties.sku,
    name: encontrador.properties.name,
    price: encontrador.properties.price,
    stock: encontrador.properties.stock,
    variantes:{
        color: {
            id: product.attributes[1].values[state.vTalle].id,
            name: product.attributes[1].name,
            value: product.attributes[1].values[state.vTalle].value,
        },
        talla: {
            id: product.attributes[0].values[state.vTalle].id,
            name: product.attributes[0].name,
            value: product.attributes[0].values[state.vTalle].value,
        }
    }, 
    ficha_tecnica: [
        {
            color: encontrador.extra_features.color
        },
        {
            marca: encontrador.extra_features.marca
        },
        {
            talla: encontrador.extra_features.talla
        },
        {
            otros: encontrador.extra_features.otros
        },
        {
            "categoria de producto": encontrador.extra_features["categoria de producto"]
        }
    ]
})
{
    "sku": "1000175236",
    "name": "Bermuda 6B660 - M",
    "price": "249.00",
    "stock": 4,
    "variantes": { 
        "color": {
            "id": 15036,
            "name": "Color",
            "value": "Khaki"
        },
        "talla": {
            "id": 15063,
            "name": "Talla",
            "value": "30"
        }
    },
    "ficha_tecnica": [
       {
        "color": "Khaki"
       },
       {
        "marca": "Rip Curl"
       },
       {
        "talla": "30"
       },
       {
        "otros": "Rip Curl"
       },
       {
        "categoria de producto": "Bermudas"
       }
    ]
} */