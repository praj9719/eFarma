import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import { linkStyle } from '../utils'
import './PlantCard.css'

export default function PlantCard(props) {
    return (
        <Col md={4} xs={6}>
            <Link to={props.linkTo} style={linkStyle}>
                <div className="card" onClick={props.onClick}>
                    <img className="img" src={props.img} alt="img" />
                    <h4>{props.name}</h4>
                </div>
            </Link>
        </Col>
    )
}