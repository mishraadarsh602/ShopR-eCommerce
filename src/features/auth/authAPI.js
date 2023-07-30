
export function createUser(userData){
   return new Promise(async(resolve) =>{
   const response = await fetch('http://localhost:8080/users',{
      method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body:JSON.stringify(userData)
   })
   const data  = await response.json()
   resolve({data})
   })
}


//cehck user login
export function checkUser(loginInfo){
   return new Promise(async(resolve,reject) =>{
      const email = loginInfo.email;
      const password = loginInfo.password;
   const response = await fetch('http://localhost:8080/users?email='+email);
   const data  = await response.json();
   if(data.length){
      if(password===data[0].password){
         resolve(data[0])
      }else{
         reject({message:"wrong credentials"})
      }
      
   }else{
      resolve({message:"User not found"})
   }
   resolve({data})     
   })
 
   }