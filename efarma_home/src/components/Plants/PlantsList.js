import { Container, Row } from "reactstrap";
import { plantsInfo } from "./PlantsInfo";
import PlantCard from './PlantCard'

export default function PlantsList(props) {
    return (
        <Container>
            <Row>
                {plantsInfo.map((plant, idx) =>
                    <PlantCard img={plant.Img} name={plant.Crop} linkTo={`plants/${idx}`} key={plant.Crop} />
                )}
            </Row>
        </Container>
    )
}