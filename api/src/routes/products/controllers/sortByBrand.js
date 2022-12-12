module.exports = (products, sortPrice) => {
    if (sortPrice === 'up') {
        products.sort((first, second) => {
            if (first.brand.name.toLowerCase() < second.brand.name.toLowerCase())
                return -1
            if (first.brand.name.toLowerCase() > second.brand.name.toLowerCase())
                return 1
            return 0;
        })
        return products;
    }

    if (sortPrice === 'down') {
        products.sort((first, second) => {
            if (first.brand.name.toLowerCase() < second.brand.name.toLowerCase())
                return 1
            if (first.brand.name.toLowerCase() > second.brand.name.toLowerCase())
                return -1
            return 0;
        })
        return products;
    }
}
