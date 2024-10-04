import { FC } from 'react'
import {
    Nav,
    Navbar,
    NavItem,
    NavLink,
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

interface MenuProps {
    next: () => void;
    prev: () => void;
    title: string;
}

const Menu: FC<MenuProps> = ({ next, prev, title }) => {
    return (
        <>
            <Navbar expand="xs" dark>
                <Nav className="w-100 justify-content-evenly align-items-center" navbar>
                    <NavItem>
                        <NavLink href="#" onClick={() => prev()}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <h3>{title}</h3>
                    </NavItem>

                    <NavItem>
                        <NavLink href="#" onClick={() => next()}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </>
    )
}

export default Menu;
