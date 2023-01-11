module.exports = function (array) {
    if (array[0] > array[1]) {
        let tmp = array[0];
        array[0] = array[1];
        array[1] = tmp;
    }

    return array;
}