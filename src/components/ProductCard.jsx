import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  return (
    <div className="card">
      <img className="thumb" src={product.imageUrl} alt={product.name} />
      <div className="card-body">
        <div className="name">{product.name}</div>
        <div className="price">${product.price.toFixed(2)}</div>
        <button className="btn primary" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  )
}