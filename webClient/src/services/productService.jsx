
import SERVER_URL from '../environment'


export const categoryService = {
    createCategory: async(payload) => {
        const fd= new FormData()
       fd.append('catName',payload.catName)
       fd.append('catDescription',payload.catDescription)
       fd.append('<NAME>',payload.catImage[0])
       const request =await  fetch("/category/create", {method: "POST",body: fd, headers: {'Accept': 'application/json'}, });
       if(request.status!==401) return  request.json() 
       return  []
      
},
categoryAlreadyExist: async(catName) => {
   const request =await  fetch(`${SERVER_URL}/category/validate/alreadyExist`, {method: "POST",body: JSON.stringify({catName}),headers: {'Content-Type': 'application/json'}, });
   if(request.status!==401) return  request.json() 
   return  []

  
},
allCatgories: async() => {
    const request =await  fetch(`${SERVER_URL}/category/all`, {method: "GET",headers: {'Content-Type': 'application/json'} });
    if(request.status!==401) return  request.json()
    return  []
   
 },
 deleteCatgeory:async(catName)=>{
     console.log("***-  deleteCatgeory:async(catName) -***")
     console.log(catName)
    const request =await  fetch(`${SERVER_URL}/category/delete?catName=${catName}`);
    if(request.status!==401) return  request.json() 
    return  []
 },
 updateCatgeory:async()=>{
    const request =await  fetch(`${SERVER_URL}/category/delete/{catName}`, {method: "GET",headers: {'Content-Type': 'application/json'}, });
    if(request.status!==401) return  request.json() 
    return  []
 },
 allProducts:async()=>{
   const request =await  fetch(`${SERVER_URL}/product/all_products/`, {method: "GET",headers: {'Content-Type': 'application/json'}, });
   if(request.status!==401) return  request.json() 
   return  []
}
}

export default categoryService;