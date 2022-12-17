export function addItem(array, obj) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].idProduct === obj.idProduct) {
            array[i].quantity = Number(array[i].quantity) + Number(obj.quantity);
            return array;
        }
    }

    array.push(obj);
    return array;
};