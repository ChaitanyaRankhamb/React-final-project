import Header from '../components/Header.jsx'
import CartItem from '../components/CartItem.jsx'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function Cart() {
  const { items, totalItems, totalCost, clearCart } = useCart()
  const list = Object.values(items)

  return (
    <div>
      <Header />
      <main className="content">
        <h2>Your Shopping Cart</h2>
        <div className="cart-summary">
          <div>Total Items: <strong>{totalItems}</strong></div>
          <div>Total Cost: <strong>${totalCost.toFixed(2)}</strong></div>
        </div>
        {list.length === 0 ? (
          <p>Your cart is empty. <Link to="/products">Browse plants</Link>.</p>
        ) : (
          <div className="cart-list">
            {list.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
        )}
        <div className="cart-actions">
          <Link to="/products" className="btn">Continue Shopping</Link>
          <button className="btn success" onClick={() => alert('Checkout coming soon!')}>Checkout</button>
          {list.length > 0 && (
            <button className="btn danger" onClick={clearCart}>Clear Cart</button>
          )}
        </div>
      </main>
    </div>
  )
}