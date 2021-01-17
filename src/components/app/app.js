import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMesage';
import CharacterPage from '../characterPage';

export default class App extends Component {

    state = {
        showRandomChar: true,
        error: false
    };

    componenDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState( state  => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };

    render() {
        const char = this.state.showRandomChar ? <RandomChar/> : null;
        const classBtn = this.state.showRandomChar ? "btn btn-danger" : "btn btn-secondary";

        if (this.state.error) {
            return <ErrorMessage/>
        }
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <button onClick={this.toggleRandomChar} className={classBtn}>Toggle random Character</button>
                            {char}
                        </Col>
                    </Row>
                   <CharacterPage/>
                </Container>
            </>
        );
    };
 }

