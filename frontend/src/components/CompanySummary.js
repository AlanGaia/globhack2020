import React, { useState, useEffect } from 'react';
import { Jumbotron, Button, Card, Dropdown, Col, Row } from 'react-bootstrap';

export default (props) =>{

    const [ companySummary, setCompanySummary ] = useState([])

    useEffect( () =>{

            fetch(`http://localhost:8080/companyReview?companyName=${props.companyName}`)

            .then(res => res.json())

            .then(data =>  setCompanySummary(data) ) 
    }, [])
    
    return(
        <>
            <Jumbotron className="m-4 colour-text">

                <Row className="d-flex aligns-items-center">

                    <Col>
                        <h1 className="m-4" style={{fontSize: '4rem'}}>{props.company.name}</h1>
                    </Col>

                    <Col>
                        <Card className="h5 m-4 p-4 border" style={{ width: '10rem', height: '5rem'}}>
                             Total : {props.company.globalAverage}
                        </Card>
                    </Col>
                </Row>

                

                <Dropdown.Divider className="border-blue m-3" />

                <p className="lead m-5">
                    Aqui puedes ver las calificaciones promedio de la empresa, y luego ver cada reseña recibida en particular.
                </p>
                
                <div className="d-flex justify-content-center">

                    <Card className="h5 m-4 p-4 border-blue">
                        Profesionalismo : {props.company.averageQuestionOne}
                    </Card>

                    <Card className="h5 m-4 p-4 border-blue">
                        Feedback : {props.company.averageQuestionTwo}
                    </Card>

                    <Card className="h5 m-4 p-4 border-blue">
                        Inclusión : {props.company.averageQuestionThree}
                    </Card>
                </div>

                <p className="text-right mt-5">
                    <Button className="button-orange">Calificá a esta empresa</Button>
                </p>
            </Jumbotron>
        </>
    )

}