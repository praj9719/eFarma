import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { linkStyle } from "./utils";

export default function CallAPI(props) {
    return (
        <div style={{marginTop:"200px"}}>
            <Link to="/plants" style={linkStyle}>
            <Button color="primary">Plants</Button>
        </Link>
        </div>
    )

}