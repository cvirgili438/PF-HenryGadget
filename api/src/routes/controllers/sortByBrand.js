module.exports = (products, sortPrice) => {
    if (sortPrice === 'up') {
        products.sort((first, second) => {
            if (first.brand.toLowerCase() < second.brand.toLowerCase())
                return -1
            if (first.brand.toLowerCase() > second.brand.toLowerCase())
                return 1
            return 0;
        })
        return products;
    }

    if (sortPrice === 'down') {
        products.sort((first, second) => {
            if (first.brand.toLowerCase() < second.brand.toLowerCase())
                return 1
            if (first.brand.toLowerCase() > second.brand.toLowerCase())
                return -1
            return 0;
        })
        return products;
    }
}
