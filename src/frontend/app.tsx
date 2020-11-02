import React from "react";
import State from "~/lib/interfaces/State"
import {useDispatch, useSelector} from 'react-redux'

const selectCounter = (state: State) => state.counter.value

const App = (props: any) => {
    const dispatch = useDispatch()
    const counter = useSelector(selectCounter)

    console.log(counter)

    return (
        <section className="app">
            <h1>Tales of a Dev</h1>
            <p>{counter}</p>
            <button onClick={() => dispatch({type: 'counter/increment'})}>+</button>
            <button onClick={() => dispatch({type: 'counter/decrement'})}>-</button>
        </section>
    )
}

export default App