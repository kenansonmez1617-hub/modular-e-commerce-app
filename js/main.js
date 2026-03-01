import fetchProduct from "./api.js"
import { addToCart } from "./cart.js"
import { getFromLocale } from "./helper.js"
import { renderCartItems, renderCartQuantity, renderCartTotal, renderNotFound, renderProduct, uiElement, } from "./ui.js"



const CART = "cart"


document.addEventListener("DOMContentLoaded", async()=>{
   uiElement.menuBtn.addEventListener('click',()=>{
    uiElement.nav.classList.toggle('open')
   })

   //local storage a gore sepet guncelle
   let cart = getFromLocale(CART)

   renderCartQuantity(cart)


   if (window.location.pathname.includes('/index.html')) {
       const products = await fetchProduct()
       console.log(products);

       renderProduct(products, (e)=>{
        console.log(e)

        addToCart(e, products)
       })
   }else {
    if (cart.length > 0) {
     renderCartItems(cart)

     renderCartTotal(cart)
    } else {
      renderNotFound()
    }
   }
})
