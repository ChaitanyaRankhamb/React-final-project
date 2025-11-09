import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <h1 className="title">Paradise Nursery</h1>
        <p className="tagline">
          Welcome to your urban oasis. Browse our curated collection of easy-care
          houseplants and bring a touch of paradise to your home.
        </p>
        <Link to="/products" className="btn primary">Get Started</Link>
      </div>
    </div>
  )
}