
export function createUser(userData) {
   return new Promise(async (resolve, reject) => {

      try {
         const response = await fetch('http://localhost:8080/auth/signup', {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
         })
         const data = await response.json();
         console.log({data})

         resolve({ data })
      } catch (err) {
         reject(err);
      }

   })
}


//check user login
export function checkUser(loginInfo) {
   return new Promise(async (resolve, reject) => {

      try {
         const response = await fetch('http://localhost:8080/auth/login', {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(loginInfo)
         });
         if (response.ok) {
            const data = await response.json();
            resolve({ data })
         } else {
            const error = await response.json();
            reject(error)
         }
      }
      catch (err) {
         reject(err);
      }
   })

}



export function signOut(userId) {
   return new Promise(async (resolve) => {
      // TODO: on server  we will remove user session info
      resolve({ data: "success" })
   })
}