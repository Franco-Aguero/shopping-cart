const utils = {
    activeStyle: (state, name) => {
        if(state == name) return "Active"
        
    },
    totalPriceCart: ( prop ) => {
        let costProduct = 0;
        prop.map( product => costProduct += parseInt(product.price) * parseInt(product.unit) )
        return costProduct
    },
    addSomethingLocalStorage : (key, prop) => {
        localStorage.setItem(key, JSON.stringify(prop))
    },
    bringSomeLocalStorage : (key) => {
        let newValue = localStorage.getItem(key);   
        return JSON.parse(newValue)
    },
}

export default utils;