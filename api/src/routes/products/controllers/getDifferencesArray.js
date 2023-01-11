module.exports = (Arrayquery, arrayCompare) => {
    return Arrayquery.filter(element => {
        return !arrayCompare.includes(element);
      });

}