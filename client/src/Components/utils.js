const utils = {
    totalPriceCart: ( prop ) => {
        let costProduct = 0;
        prop.map( product => costProduct += parseInt(product.price) * parseInt(product.unid) )
        return costProduct
    }
}

export default utils;