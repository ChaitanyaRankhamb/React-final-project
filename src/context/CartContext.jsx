import { createContext, useContext, useMemo, useReducer } from 'react'
import { plants } from '../data/plants.js'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const id = action.product.id
      const qty = state.items[id]?.qty ?? 0
      return { items: { ...state.items, [id]: { product: action.product, qty: qty + 1 } } }
    }
    case 'REMOVE': {
      const { [action.id]: _, ...rest } = state.items
      return { items: rest }
    }
    case 'INCREASE': {
      const current = state.items[action.id]
      if (!current) return state
      return { items: { ...state.items, [action.id]: { ...current, qty: current.qty + 1 } } }
    }
    case 'DECREASE': {
      const current = state.items[action.id]
      if (!current) return state
      const nextQty = Math.max(0, current.qty - 1)
      const nextItems = { ...state.items }
      if (nextQty === 0) {
        delete nextItems[action.id]
      } else {
        nextItems[action.id] = { ...current, qty: nextQty }
      }
      return { items: nextItems }
    }
    case 'CLEAR': {
      return { items: {} }
    }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: {} })

  const value = useMemo(() => {
    const entries = Object.values(state.items)
    const totalItems = entries.reduce((sum, e) => sum + e.qty, 0)
    const totalCost = entries.reduce((sum, e) => sum + e.qty * e.product.price, 0)
    return {
      items: state.items,
      totalItems,
      totalCost,
      addToCart: (product) => dispatch({ type: 'ADD', product }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      increaseQty: (id) => dispatch({ type: 'INCREASE', id }),
      decreaseQty: (id) => dispatch({ type: 'DECREASE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      products: plants,
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}