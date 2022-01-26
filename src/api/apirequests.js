export const sendAPIRequest = async () => {

    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user/user`, {
            method: "GET",
            headers: {
            'Authorization': 'Bearer' + localStorage.getItem('jwt'),
        },
        });
        return await res.json();
    } catch(err) {
       throw new Error("Please login to continue")
    }
}

 // get user details
 export const getUser = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/user/user`, {
            method: "GET",
            credentials: "include",
        });
        return await res.json();
    } catch(err) {
       throw new Error("Please login to continue")
    }
}