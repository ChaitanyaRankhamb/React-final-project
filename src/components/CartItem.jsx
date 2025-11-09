import { useCart } from '../context/CartContext.jsx'

export default function CartItem({ item }) {
  const { increaseQty, decreaseQty, removeFromCart } = useCart()
  const { product, qty } = item
  return (
    <div className="cart-item">
      <img className="thumb small" src={product.imageUrl} alt={product.name} />
      <div className="details">
        <div className="name">{product.name}</div>
        <div className="unit">Unit: ${product.price.toFixed(2)}</div>
      </div>
      <div className="qty-controls">
        <button className="icon" onClick={() => decreaseQty(product.id)}>-</button>
        <span className="qty">{qty}</span>
        <button className="icon" onClick={() => increaseQty(product.id)}>+</button>
      </div>
      <div className="line-total">${(qty * product.price).toFixed(2)}</div>
      <button className="btn danger" onClick={() => removeFromCart(product.id)}>Delete</button>
    </div>
  )
}