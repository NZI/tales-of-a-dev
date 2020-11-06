import React from "react";
import {State} from "~/lib/interfaces/State"
import {useDispatch, useSelector} from 'react-redux'
import styles from './app.scss'
import {COUNTER_DECREMENT, COUNTER_INCREMENT} from "./reducers/counterReducer"
import LoadState from "~/lib/interfaces/LoadState"
import Button from "./components/Button"
import {APP_SHOW_LOGIN, APP_TOGGLE_LOGIN} from "./reducers/appReducer";


function getClassName(classObject: {[key: string]: boolean}) {
    const classes = Object.keys(classObject)

    return classes.filter(className => classObject[className]).join(' ')
}

const icon = (key: string) => <i className="material-icons">{key}</i>

export default (props: any) => {
    const dispatch = useDispatch()
    // const counter = useSelector(selectCounter)
    const page = useSelector((state: State) => state.page)
    const app = useSelector((state: State) => state.app)

    return (
        <section className={getClassName({
            [styles.app]: true,
            [styles.loading]: page.loadState !== LoadState.LOADED
        })}>
            <div className={styles.menu}>
                <Button onClick={() => dispatch({type: APP_TOGGLE_LOGIN})}>{icon('lock')}</Button>
            </div>
            <h1>Tales of a Dev</h1>
            <div className={getClassName({
                [styles.account]: true,
                [styles.show]: app.showLogin
            })}>
                <input name="username" placeholder="username" type="text"/>
                <input name="password" placeholder="password" type="password"/>
            </div>
        </section>
    )
}