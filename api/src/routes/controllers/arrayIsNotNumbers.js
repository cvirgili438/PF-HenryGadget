module.exports = function (array) {
    let arrayNumbers = array.map(Number);
    let notNumber = false;

    arrayNumbers.forEach(element => {
        if (isNaN(element))
            notNumber = true;
    });

    if (!notNumber)
        return arrayNumbers;
    else
        return false;
}