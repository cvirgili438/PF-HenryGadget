let array = [];

for (let index = 0; index < 100; index++)
    array.push({
        score: String(Math.floor(Math.random() * 5) + 1),
        comment: 'Comentario review ' + index + '.'
    });

module.exports = array;
