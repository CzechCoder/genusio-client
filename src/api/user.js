// register user
export const register = async ({ referral, username, firma, firmaWeb, firmaPozice, email, telefon, linkedin, budovatel, duvodyy, temaHlavni, temaDalsi, vzkaz, password, gdprSouhlas } = {}) => {
  const user = { referral, username, firma, firmaWeb, firmaPozice, email, telefon, linkedin, budovatel, duvodyy, temaHlavni, temaDalsi, vzkaz, password, gdprSouhlas };

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    throw new Error("Cannot register at this time.");
  }
};

// login function
export const login = async ({ email, password } = {}) => {
  const user = { email, password };

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Authorization': 'Bearer' + localStorage.getItem('jwt'),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await res.json(),
    console.log("sent w/ headers:" + res.json);
  } catch (err) {    
    throw new Error("Cannot login at this time.");
  }
};
// logout
 export const logout = async () => {
     try {
         const res = await fetch(`${process.env.REACT_APP_API_URL}/user/logout`, {
             method: "GET",
             credentials: "include",
         });
         return await res.json();
     } catch(err) {
        console.log(err);
     }
 }

 // get user details
 export const getUser = async () => {
     try {
         const res = await fetch(`${process.env.REACT_APP_API_URL}/user/user`, {
             method: "GET",
             credentials: "include",
             headers: {
              'Authorization': 'Bearer' + localStorage.getItem('jwt'),
          },
         });
         return await res.json();
     } catch(err) {
        throw new Error("Please login to continue")
     }
 }