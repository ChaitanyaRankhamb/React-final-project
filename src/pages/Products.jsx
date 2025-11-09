import Header from '../components/Header.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Products() {
  const { products } = useCart()
  const byCategory = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || []
    acc[p.category].push(p)
    return acc
  }, {})

  return (
    <div>
      <Header />
      <main className="content">
        <h2>Shop Houseplants</h2>
        {Object.entries(byCategory).map(([cat, items]) => (
          <section key={cat} className="category">
            <h3>{cat}</h3>
            <div className="grid">
              {items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}