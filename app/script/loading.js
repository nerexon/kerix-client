let i = 0
const loading = document.getElementById("loading")

setInterval(() => {
   switch(i){
      case 0: {
         loading.innerText = "Loading"
         break
      }
      case 1: {
         loading.innerText = "Loading."
         break
      }
      case 2: {
         loading.innerText = "Loading.."
         break
      }
      case 3: {
         loading.innerText = "Loading..."
         break
      }
      case 4: {
         loading.innerText = "Loading...."
         break
      }
   }

   i = i < 4 ? i + 1 : 0
}, 350)