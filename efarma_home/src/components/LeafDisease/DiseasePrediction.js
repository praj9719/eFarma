import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { linkStyle } from '../utils'
import { Button, Col, Container, Row } from "reactstrap";
import './DiseasePrediction.css'

const default_img = "https://media.istockphoto.com/vectors/leaves-camera-vector-id1183552817?k=20&m=1183552817&s=612x612&w=0&h=9FJtPXsd731v3LoZXOSjzicnZIGgJNWlk_y10Hi04EM="

export default function DiseasePrediction(props) {

    const [state, setState] = useState(0);
    const [predictionResult, setPredictionResult] = useState(undefined)
    const [searchString, setSearchString] = useState('Agriculture')

    const [file, setFile] = useState(null);
    const [imgEvent, setImageEvent] = useState(null);

    const chooseImageRef = useRef(null);
    const submitBtnRef = useRef(null);

    const chooseImageHandler = (e) => chooseImageRef.current.click();
    const submitBtnHandler = (e) => submitBtnRef.current.click();
    const imageChangedHandler = (e) => {
        setImageEvent(e);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const submitFormHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', imgEvent.target.files[0]);

        setState(1);
        let crop = props.match.params.plant;
        let url = 'http://127.0.0.1:3001/ldd_' + crop.toLowerCase();
        fetch(url, { method: 'POST', body: data })
            .then((response) => response.json())
            .then((response) => {
                let res = response.result
                if (res.status == 0) setPredictionResult(<h4>Something went wrong on server side</h4>)
                else {
                    let c1 = res.classes[res.order[0]]
                    setSearchString(c1)
                    let p1 = (res.prediction[res.order[0]] * 100).toFixed(2)
                    let c2 = res.classes[res.order[1]]
                    let p2 = (res.prediction[res.order[1]]*100).toFixed(2)
                    let temp = <div>
                        <h4>{c1} - {p1}%</h4>
                        <p style={{color:'gray'}}>{c2} - {p2}%</p>
                    </div>
                    setPredictionResult(temp)
                }
                setState(2)
            })
            .catch((error) => setState(3))

    }

    const uploadImage = <Container className='diseaseprediction'>
        <form onSubmit={submitFormHandler} style={{ display: 'none' }}>
            <input ref={chooseImageRef} type="file" accept="image/*" onChange={imageChangedHandler} />
            <input ref={submitBtnRef} type="submit" />
        </form>
        <br />
        <h4>Select a image of a leaf for disease detection</h4>
        <p>Crop Type : {props.match.params.plant}</p>
        <Col>
            <br />
            <Row><img src={file === null ? default_img : file} alt="img" /></Row>
            <br />
            <Row>
                <Col md={1}></Col>
                <Col md={4} xs={12}>
                    <Button color="success" block onClick={chooseImageHandler}>
                        <b>Choose Image</b>
                    </Button>
                </Col>
                <Col md={2}><br /></Col>
                <Col md={4} xs={12}>
                    <Button disabled={file === null} color="success" block onClick={submitBtnHandler}>
                        <b>Predict</b>
                    </Button>
                </Col>
                <Col md={1}></Col>
            </Row>
        </Col>
        <br />
    </Container>

    const progress = <div className='progress'>
        <Row>
            <Col><div className="loader" /></Col>
            <Col style={{ display: "flex", alignItems: "center", marginRight: "8px" }}>Please Wait</Col>
        </Row>

    </div>

    const prediction = <Container className='diseaseprediction'>
        <br />
        {/* <h4>{predictionResult}</h4> */}
        {predictionResult}
        <Col>
            <br />
            <Row><img src={file === null ? default_img : file} alt="img" /></Row>
            <br />
            <Row>
                <Col md={1}></Col>
                <Col md={4} xs={12}>
                    <Button color="success" outline block onClick={() => {
                        setFile(null)
                        setState(0);
                    }}>
                        <b>Try Again</b>
                    </Button>
                </Col>
                <Col md={2}><br /></Col>
                <Col md={4} xs={12}>
                    <a href={"https://www.google.com/search?q=" + props.match.params.plant + " " + searchString} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button color="success" block >
                            <b>More Details</b>
                        </Button>
                    </a>
                </Col>
                <Col md={1}></Col>
            </Row>
        </Col>
        <br />
    </Container>

    const error = <Container className='diseaseprediction' style={{ width: "fit-content", padding: "16px 32px" }}>
        <img src="https://media.istockphoto.com/vectors/error-page-dead-emoji-illustration-vector-id1095047472?k=20&m=1095047472&s=612x612&w=0&h=1lDW_CWDLYwOUO7tAsLHnXTSwuvcWqWq4rysM1y6-E8=" />
        <h4>Unable to connect to the server</h4>
        <Button color="primary" style={{ padding: "8px 24px", marginTop: "16px" }} onClick={() => setState(0)}><b>OK</b></Button>
    </Container>

    if (state == 1) return progress
    else if (state == 2) return prediction
    else if (state == 3) return error
    else return uploadImage
}