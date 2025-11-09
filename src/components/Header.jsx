import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const { totalItems } = useCart()
  const { pathname } = useLocation()
  const isProducts = pathname === '/products'
  const isCart = pathname === '/cart'

  return (
    <header className="header">
      <div className="logo">Paradise Nursery</div>
      <nav className="nav">
        {isProducts && <Link to="/cart" className="btn">🛒 Cart ({totalItems})</Link>}
        {isCart && <Link to="/products" className="btn">← Continue Shopping</Link>}
      </nav>
    </header>
  )
}