import React from "react";
import State from "~/lib/interfaces/State"
import {useDispatch, useSelector} from 'react-redux'
import styles from './app.scss'

const selectCounter = (state: State) => state.counter

const App = (props: any) => {
    const dispatch = useDispatch()
    const counter = useSelector(selectCounter)
    console.log({
        where: 'react',
        counter
    })

    return (
        <section className={styles.app}>
            <h1>Tales of a Dev</h1>
            <p>{counter.value}</p>
            <p>{JSON.stringify(counter.serverValue)}</p>
            <button onClick={() => dispatch({type: 'COUNTER/INCREMENT'})}>+</button>
            <button onClick={() => dispatch({type: 'COUNTER/DECREMENT'})}>-</button>
        </section>
    )
}

export default App