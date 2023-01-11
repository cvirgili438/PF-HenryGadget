export function checkEmail(email){
    if(email.match(/^\S+@\S+\.\S+$/))
        return email;
    else
        return false;
};