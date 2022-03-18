import { Alert } from "reactstrap"

export function Block(props) {
    return <div style={props}>{props.children}</div>
}

export const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}

export const avilable_crops = ['Tomato', 'Corn', 'Potato']

export const plants = [
    { "name": "Apple", "img": "imgs/apple.jpg" },
    { "name": "Banana", "img": "imgs/banana.jpg" },
    { "name": "Orange", "img": "imgs/orange.jpg" },
    { "name": "Strawberry", "img": "imgs/strawberry.jpg" },
    { "name": "Tomato", "img": "imgs/tomato.png" }
]


export function ShowAlert(props) {
    return (
        <Alert color={props.color === undefined ? "warning" : props.color}>{props.children}</Alert>
    )
}

export function isInt(value) {
    return !isNaN(value) &&
        parseInt(Number(value)) === value &&
        !isNaN(parseInt(value, 10));
}

export function getText(str = "") {
    if (str.length > 500) return str.substring(0, 500) + "...";
    if (str.length < 150) return str + str;
    return str;
}