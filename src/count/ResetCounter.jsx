import React from 'react'
import useCounterStore from '../store/counterStore'

const ResetCounter = () => {
    const { reset } = useCounterStore()
  return (
    <div>
        <h2>리셋</h2>
        <br/>
        <button onClick={reset}>리셋</button>
        <br/><br/><br/><br/><br/>
    </div>
  )
}

export default ResetCounter