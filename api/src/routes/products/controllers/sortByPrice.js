module.exports = (products, sortPrice) => {

    if (sortPrice === 'Lower prices') {
        products.sort((first, second) => {
            if (first.price < second.price)
                return -1
            if (first.price > second.price)
                return 1
            return 0;
        })
        return products;
    }

    if (sortPrice === 'Higher prices') {
        products.sort((first, second) => {
            if (first.price < second.price)
                return 1
            if (first.price > second.price)
                return -1
            return 0;
        })
        return products;
    }
}