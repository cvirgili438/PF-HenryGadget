let array = [];

for (let index = 0; index < 100; index++)
    array.push({
        score: String(Math.floor(Math.random() * 5) + 1),
        titleComment: 'Titulo de review ' + index + '.',
        comment: 'Comentario review ' + index + '.\n'+'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias assumenda neque, cupiditate soluta amet illum. Nam provident nobis reiciendis consequatur soluta impedit magni aliquam sapiente, voluptates eveniet ab deserunt molestiae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, maxime eum. Expedita ipsum in qui hic, praesentium ad laboriosam libero ea veritatis? Nesciunt blanditiis excepturi cumque nisi, quidem tempore id.'
    });

module.exports = array;
