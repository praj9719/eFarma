import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import './CropRecommendation.css'
import '../LeafDisease/DiseasePrediction.css';
import { Link } from 'react-router-dom';
import { linkStyle } from '../utils';

export default function CropRecommendation(props) {

    const [state, setState] = useState(0);
    const [predictionResult, setPredictionResult] = useState(undefined);

    const submitFormHandler = (e) => {
        e.preventDefault();

        let N = e.target.Nitrogen.value;
        let P = e.target.Potassium.value;
        let K = e.target.Phosphorus.value;
        let PH = e.target.PH.value;
        let temprature = e.target.Temprature.value;
        let humidity = e.target.Humidity.value;
        let rainfall = e.target.Rainfall.value;

        if (N === '-1') { N = '20'; P = '150'; K = '150'; temprature = '20'; humidity = '100'; PH = '6'; rainfall = '100'; }
        else if (N.length == 0 || P.length == 0 || K.length == 0 || PH.length == 0 || temprature.length == 0 || humidity.length == 0 || rainfall.length == 0) { alert('Fill all details'); return; }
        else if (isNaN(N) || isNaN(P) || isNaN(K) || isNaN(PH) || isNaN(temprature) || isNaN(humidity) || isNaN(rainfall)) { alert('Invalid Input/s'); return; }

        const data = new FormData();
        data.append('N', N);
        data.append('P', P);
        data.append('K', K);
        data.append('PH', PH);
        data.append('temprature', temprature);
        data.append('humidity', humidity);
        data.append('rainfall', rainfall);

        setState(1);
        fetch('http://127.0.0.1:3001/croprec', { method: 'POST', body: data })
            .then((response) => response.json())
            .then((response) => {
                setPredictionResult(response.result);
                setState(2);
            })
            .catch((error) => setState(3))
    }

    const recommendationForm = <Container className='croprec'>
        <h4>Crop Recommendation</h4>
        <br />
        <Form onSubmit={submitFormHandler}>
            <Row>
                <Col >
                    <FormGroup row>
                        <Label for="id_nitrogen" sm={4} xs={4}>Nitrogen</Label>
                        <Col sm={8} xs={8}> <Input id="id_nitrogen" name="Nitrogen" placeholder="Nitrogen (kg/ha)" /> </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id_potassium" sm={4} xs={4}>Potassium</Label>
                        <Col sm={8} xs={8}> <Input id="id_potassium" name="Potassium" placeholder="Potassium (kg/ha)" /> </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id_phosphorus" sm={4} xs={4}>Phosphorus</Label>
                        <Col sm={8} xs={8}> <Input id="id_phosphorus" name="Phosphorus" placeholder="Phosphorus (kg/ha)" /> </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id_temprature" sm={4} xs={4}>Temprature</Label>
                        <Col sm={8} xs={8}> <Input id="id_temprature" name="Temprature" placeholder="Temprature (°C)" /> </Col>
                    </FormGroup>
                </Col>
                <Col >
                    <FormGroup row>
                        <Label for="id_humidity" sm={4} xs={4}>Humidity</Label>
                        <Col sm={8} xs={8}> <Input id="id_humidity" name="Humidity" placeholder="Humidity (%)" /> </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id_ph" sm={4} xs={4}>PH</Label>
                        <Col sm={8} xs={8}> <Input id="id_ph" name="PH" placeholder="PH (0-14)" /> </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="id_rainfall" sm={4} xs={4}>Rainfall</Label>
                        <Col sm={8} xs={8}> <Input id="id_rainfall" name="Rainfall" placeholder="Rainfall (mm)" /> </Col>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={4}></Col>
                <Col md={4}><Button block type='submit' color="success">Submit</Button></Col>
                <Col md={4}></Col>
            </Row>
        </Form>
    </Container>

    const progress = <div className='progress'>
        <Row>
            <Col><div className="loader" /></Col>
            <Col style={{ display: "flex", alignItems: "center", marginRight: "8px" }}>Please Wait</Col>
        </Row>

    </div>

    const error = <Container className='diseaseprediction' style={{ width: "fit-content", padding: "16px 32px" }}>
        <img src="https://media.istockphoto.com/vectors/error-page-dead-emoji-illustration-vector-id1095047472?k=20&m=1095047472&s=612x612&w=0&h=1lDW_CWDLYwOUO7tAsLHnXTSwuvcWqWq4rysM1y6-E8=" />
        <h4>Unable to connect to the server</h4>
        <Button color="primary" style={{ padding: "8px 24px", marginTop: "16px" }} onClick={() => setState(0)}><b>OK</b></Button>
    </Container>

    const prediction = <Container className="croprec">
        <br />
        <h4>Result: <b>{predictionResult}</b></h4>
        <br /> 
        <Row>
            <Col md={1}></Col>
            <Col md={4} xs={12}>
                <Button color="success" outline block onClick={() => {
                    setState(0);
                }}>
                    <b>Try Again</b>
                </Button>
            </Col>
            <Col md={2}><br /></Col>
            <Col md={4} xs={12}>
                <a href={"https://www.google.com/search?q=agriculture " + predictionResult} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button color="success" block >
                        <b>More Details</b>
                    </Button>
                </a>
            </Col>
            <Col md={1}></Col>
        </Row>
        <br/>
    </Container>


    if (state == 1) return progress
    else if (state == 2) return prediction
    else if (state == 3) return error
    else return recommendationForm

}