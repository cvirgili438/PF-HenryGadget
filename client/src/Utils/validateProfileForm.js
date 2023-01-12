export function validate(input){
    let errors = {};
    var numberRegex = /^\d+$/;
    if(!input.name){
        errors.name='Please insert a Name'
    }
    if(!input.phoneNumber){
        errors.phoneNumber= 'phoneNumber is required'
    }
    if(!numberRegex.test(input.phoneNumber)){errors.phoneNumber= 'the caracters you have entered has a Space or not a number '}
    if(!input.img || input.img === "" || !input.currentPhoto || input.currentPhoto === "" ){
        errors.img = 'Image is required';
      }
      if(
        !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.img) &&  !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(input.currentPhoto)
      )errors.img ="*Insert a valid URL: https:// or http:// or www."
      console.log(errors)
      return errors
  
}
