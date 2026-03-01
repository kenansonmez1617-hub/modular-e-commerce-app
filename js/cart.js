import { getFromLocale, saveToLocal } from "./helper.js"
import { renderCartItems, renderCartQuantity, renderCartTotal, renderNotFound } from "./ui.js"

const CART = "cart"

let cart = getFromLocale(CART)

const addToCart = (e, products)=>{
   const productId = +e.target.dataset.id 

   const foundProduct = products.find((pro)=> pro.id === productId)

   const existingProduct = cart.find((item)=> item.id === productId)

   if (existingProduct) {
    existingProduct.quantity++
   } else {
    const cartItem = {
        ...foundProduct,
        quantity: 1
    }
    cart.push(cartItem)
   }

   //locale kaydetme
  saveToLocal(CART, cart)
  e.target.textContent = "Eklendi"
  setTimeout(() => {
 e.target.textContent = "Add To Cart"
  }, 1000);

  renderCartQuantity(cart)

}

//sepetteki miktari guncelle
 const onQuantityChange = (e) =>{
    const productId = parseInt(e.target.dataset.id)

    const newQuantity = parseInt(e.target.value)

    if (newQuantity > 0) {

        const updateItem = cart.find((item) => item.id === productId)
        updateItem.quantity = newQuantity

        saveToLocal(CART, cart)

        //cart toplami guncelle
        renderCartTotal(cart)

        renderCartQuantity(cart)

    } else {
       alert("0 dan buyuk olmali") 
       return
    }
 }

  //localden sil
  const removeFromCart = (e) => {
    const response = confirm("silmek istedigine eminmisin?")

    if (response) {

        const productId = Number(e.target.dataset.id)

        cart = cart.filter((item) => item.id !== productId)

        saveToLocal(CART, cart)

        //toplami guncelle
        renderCartTotal(cart)

        if (cart.length > 0) {
            renderCartItems(cart)
        }else {
            renderNotFound()
        }

    } 

    renderCartQuantity(cart)
  }


export {addToCart, onQuantityChange, removeFromCart}