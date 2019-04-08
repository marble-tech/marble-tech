import React, {Component, CSSProperties} from "react";
import { Col, Container, Fade } from "react-bootstrap";
import { Row } from "react-bootstrap";

interface Props {
    show:boolean;
}
export class Loading extends Component<Props,{}> {
    render() {
        const bgShadow:CSSProperties = {
            position: "fixed",
            width: "100%",
            top:"0",
            left:"0",
            height: "100%",
            backgroundColor: "rgba(0,0,0,.40)",
            display: "flex",
            zIndex: 1500,
            
    
        };
        const { show } = this.props;

        return (
            <Fade in={show}>
                <div className={"text-white" + (show ? "" : " d-none" )} style={bgShadow}>
                <Container fluid className="text-center align-self-center" >
                        <h3>Loading...</h3>
                        <div className="spinner-grow" style={{width: "6rem", height: "6rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                </Container>
                    
                </div>
            </Fade>
            
        );
    }
}