import { isRejected } from "@reduxjs/toolkit";

export function fetchLoggedInUserOrders(userId) {
   return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:8080/orders/?user=' + userId);
      const data = await response.json();
      resolve({ data })
   })
}

export function fetchLoggedInUser(userId) {
   return new Promise(async (resolve) => {
      console.log("userID userAPI", userId)
      const response = await fetch('http://localhost:8080/users/' + userId);
      const data = await response.json();
      resolve({ data })
   })
}


//update user
export function updateUser(update) {
   return new Promise(async (resolve,reject) => {
      try{
         console.log("updateUser in userApi value ", update)
         const response = await fetch('http://localhost:8080/users/' + update.id, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
         })
         const data = await response.json()
         resolve({ data })
      } catch(err){
         reject(err);
         console.log("updateUser in userApi reject ", err)

      }
    
   })
}
