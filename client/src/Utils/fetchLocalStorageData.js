export const fetchUserData = ()=>{
    const userInfo = 
        localStorage.getItem('user') !== undefined
        ? JSON.parse(localStorage.getItem('user'))
        : localStorage.clear();

    return userInfo
}