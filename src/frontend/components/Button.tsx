import React from "react"
import styles from './button.scss'

export default (props: any) => {

    return <div className={styles.button}
                onClick={
                    e => 'onClick' in props && props.onClick(e)
                }>
        {props.children}
    </div>
}