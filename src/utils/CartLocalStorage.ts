import { calcTotalPrice } from "./calcTotalPrice"

export const CartLocalStorage = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  return {items, totalPrice}
}