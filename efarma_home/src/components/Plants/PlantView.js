import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { linkStyle, ShowAlert, getText, avilable_crops } from "../utils";
import { plantsInfo } from "./PlantsInfo";
import './PlantView.css'

export default function PlantView(props) {
    var plantId = props.match.params.plantId;
    if (!(plantId >= 0 && plantId < plantsInfo.length)) return (<ShowAlert>Invalid plantId go back to <a href="/plants">Plants</a></ShowAlert>)
    else {
        const plant = plantsInfo[plantId]

        let link_to = <Link to={`/leaf_disease_detection/${plant.Crop}`} style={linkStyle}>
            <Button color="success" block ><b>Leaf Disease Detection</b></Button>
        </Link>

        const showalert = (e) => alert('Leaf Disease Detection is not available for this crop!')
        if (avilable_crops.indexOf(plant.Crop) < 0)
            link_to = <Button block onClick={showalert}><b>Leaf Disease Detection</b></Button>
            

        return (
            <div className="plantview">
                <Container>
                    <Row>
                        <Col md={8} xs={12}>
                            <h4>{plant.Crop}</h4>
                            <hr />
                            <p style={{ color: "#444", fontSize: "medium" }}>Type : <b>{plant.Type}</b> &nbsp;  &nbsp;  Season : <b>{plant.Season}</b></p>
                            <p>{getText(plant.Description)}</p>
                        </Col>
                        <Col md={4} xs={12}>
                            <img className="img" src={plant.Img} alt="img" />
                            {link_to}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}