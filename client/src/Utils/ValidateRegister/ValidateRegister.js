export default function validateRegister (input){
    let errors = {}
    if(!input.name){
        errors.name = 'Name is required*'
    }
    if(!input.lastname){
        errors.lastname = 'Last name is required*'
    }
    if(!input.email)errors.email = 'Email is required*'
    if(!input.password)errors.password = 'Passowrd is required*'
    if(input.password !== input.confirmPassword){
        errors.password='Password dont match'
        errors.confirmPassword='Password dont match'
    }
    if(input.password.length < 6) errors.password='Password needs at least 6 characters*'
    return errors
}