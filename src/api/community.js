// register community
export const registerComm = async ({
  communityname,
        uniqueValue,
        image,
        foundingDate,
        membersCount,
        commCategoriess,
        growthToolss,
        otherTools,
        membershipPayment,
        regIntentionn 
} = {}) => {
    const user = {
      communityname,
      uniqueValue,
      image,
      foundingDate,
      membersCount,
      commCategoriess,
      growthToolss,
      otherTools,
      membershipPayment,
      regIntentionn
  };
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/communities`, {
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
  
   // get user details
   export const getComm = async () => {
       try {
           const res = await fetch(`${process.env.REACT_APP_API_URL}/community`, {
               method: "GET",
               credentials: "include",
           });
           return await res.json();
       } catch(err) {
          throw new Error("Please login to continue")
       }
   }