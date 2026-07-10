import React from 'react'
import useCounterStore from '../store/counterStore'
const Counter = () => {
    const { count, increase, decrease } = useCounterStore()
  return (
    <div>
        <h2>{count}</h2>
        <br/><br/>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
    </div>
  )
}

export default Counter