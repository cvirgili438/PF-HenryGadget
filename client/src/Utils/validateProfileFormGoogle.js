export function validate(input){
    let errors = {};
    if(!input.phoneNumber){
        errors.phoneNumber= 'phoneNumber is required'
    }
    if(!input.img || input.img === "" || !input.currentPhoto || input.currentPhoto === "" ){
        errors.img = 'Image is required';
      }
      if(
        !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.img) &&  !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.currentPhoto)
      )errors.img ="*Insert a valid URL: https:// or http:// or www."
      
      return errors
  
}
