import React, { FC } from 'react'
import Menu from "components/Menu"
import "./style.scss"

interface WrapperProps {
    children: React.ReactNode
    next: () => void;
    prev: () => void;
    title: string;
}

const Wrapper: FC<WrapperProps> = ({ children, next, prev, title }) => {
    return (
        <div className='wrapper-container'>
            <Menu
                next={next}
                prev={prev}
                title={title}
            />

            <div className='container-fluid p-0 h-100'>
                {children}
            </div>
        </div>
    )
}

export default Wrapper;