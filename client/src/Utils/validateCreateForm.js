export function validate(input) {
    let errors = {};
    if (!input.name ) {
      errors.name = 'Product name is required';
    } 
    if (input.productsName && input.productsName.some((e) => e.toLowerCase() === input.name.toLowerCase())) {
      errors.name = 'Name already exist';
    }
    if(!input.type){
      errors.type = 'Type is required';
    }
    if(!input.brand){
      errors.brand = 'Brand is required';
    }
    if(input.price === 0 || !input.price){
        errors.price = 'Price must be bigger than 0';
    }
    if(!input.model){
        errors.model = 'Model is required';
    }
    if(!input.stock || input.stock === 0){
        errors.stock = 'Stock is required';
    }
    if(!input.img || input.img === ""){
      errors.img = 'Image is required';
    }
    if(
      !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.img)
    )errors.img ="*Insert a valid URL: https:// or http:// or www."

    return errors;
};