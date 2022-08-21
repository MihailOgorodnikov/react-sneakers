import {Link} from 'react-router-dom';
import React from "react";
import { AppContext } from "../App";

function Header (props) {
    const {cartItems} = React.useContext(AppContext);
    const totalPrise = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="">
            <div className="d-flex align-center">
                <img width={40} height={40} src="img/logo.png" />
                <div>
                    <h3 className="text-uppercase">REACT SNEAKERS</h3>
                    <p className="opacity-5">Магазин лучших кроссовок</p>
                </div>
            </div>
            </Link>
            <ul className="d-flex">
                <li onClick={props.onClikeCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="img/cart.svg" />
                    <span>{totalPrise} руб.</span>
                </li>
                <li className="mr-10 cu-p">
                    <Link to="favorits">
                        <img width={18} height={18} src="img/heart.svg" />
                    </Link>
                </li>
                <li>
                <Link to="orders">
                        <img width={18} height={18} src="img/user.svg" />
                    </Link>
                </li>
            </ul>
      </header>
    );
}

export default Header;