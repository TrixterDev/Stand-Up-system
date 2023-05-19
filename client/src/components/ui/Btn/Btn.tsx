import React from 'react'
import st from './style.module.sass'

interface BtnProps {
    textBtn: string
    dC?: string
    type?: 'button' | 'submit' | 'reset' | undefined
}

const Btn: React.FC<BtnProps> = ({ textBtn, dC, type }) => {
    return (
        <button className={`${st.btn} ${dC}`} type={type}>
            {textBtn}
        </button>
    )
}

export default Btn
