import './App.css';
import FactFetcher from "./components/FactFetcher/FactFetcher";
import {createContext, PureComponent} from "react";
import * as React from 'react';
import ModalDialog from "./components/ModalDialog/ModalDialog";
import {Button} from "@mui/material";

function createCookie(cookieName, cookieValue, hourToExpire) {
    let date = new Date();
    date.setTime(date.getTime()+(hourToExpire*60*60*1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " +date.toGMTString();
}

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            open: false,
        };
        this.enoughFactsForToday = document.cookie.split(';').some(value => value.includes("factoid=true"))
    }


    handleFactFetched = event => {
        this.setState({show: true})
        createCookie("factoid", true, 24)
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = (value) => {
        this.setState({ open: false })
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <FactFetcher sytle={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: `100%`,
                    }} onFactFetched={this.handleFactFetched} factsAvailability={!this.enoughFactsForToday}/>
                    {(this.state.show || this.enoughFactsForToday) && <div className="modalButton">
                        <Button onClick={this.handleClickOpen}> {/*variant="outlined"*/}
                            Let the world know a new random fact
                        </Button>
                        <ModalDialog
                            open={this.state.open}
                            onClose={this.handleClose} />
                    </div>}
                </header>
            </div>
        );
    }
}