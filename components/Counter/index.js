import './index.css'

const Counter = props => {
  const {incrementItem, decrementItem, itemsInCart, Item} = props

  const onIncrementItem = () => {
    incrementItem(Item)
  }

  const onDecrementItem = () => {
    decrementItem(Item)
  }
  return (
    <div className="item-count-container">
      <button type="button" className="count-btn" onClick={onDecrementItem}>
        -
      </button>
      <p className="pages">{itemsInCart}</p>
      <button type="button" className="count-btn" onClick={onIncrementItem}>
        +
      </button>
    </div>
  )
}

export default Counter
