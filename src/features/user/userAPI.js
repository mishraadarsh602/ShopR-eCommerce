export function fetchLoggedInUserOrders(userId){
    return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8080/orders/?user.id='+userId);
    const data  = await response.json();
    resolve({data})
    })
 }

 export function fetchLoggedInUser(userId){
   return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/users/'+userId);
   const data  = await response.json();
   resolve({data})
   })
}

 
//update user
export function updateUser(update){
   return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/users/'+update.id,{
      method:"PATCH",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify(update)
   })
   const data  = await response.json()
   resolve({data})
   })
}
