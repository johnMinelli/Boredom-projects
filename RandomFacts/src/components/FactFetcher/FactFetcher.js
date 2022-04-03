import React, {PureComponent} from "react";
import PropTypes from "prop-types";
// import "./FactFetcher.css";
import CustomPaper from "../CustomPaper";
import {Button, Typography} from '@mui/material'
import db from "../../firebase.config";
import {collection, getDoc, doc, addDoc} from 'firebase/firestore'


async function getRandomFactFirebase() {
    let max = (await getDoc(doc(db, "/randomfacts/info"))).data().max;
    const fact = (await getDoc(doc(db, "/randomfacts/" + Math.floor((Math.random() * max) + 1)))).data().text;
    return fact;
}

export default class FactFetcher extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: true,
            fact: ""
        }
    }

    static propTypes = {
        onFactFetched: PropTypes.func,
        factsAvailability: PropTypes.bool
    };

    factFetch = async event => {
        this.setState({show: false})
        this.props.onFactFetched(event);
        const fact = await getRandomFactFirebase();
        this.setState({fact: fact})
    };


    render() {
        return (
            <CustomPaper elevation={6}>
                <div sytle={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: `100%`,
                }}>
                    {this.props.factsAvailability ?
                        <div>
                            <Typography component="h1" variant="h5">Today I'm wondering about... </Typography>
                            {this.state.show?
                            <Button fullWidth variant="contained" color="primary" style={{
                                margin: 10, boxShadow: "none",
                                background: '#00000000', fontSize: 150
                            }} onClick={this.factFetch}> 🐵 </Button> : this.state.fact.length==0 ? <p>...</p>:
                            <Typography style={{marginTop: 10}} component="h1" variant="h5">{this.state.fact}</Typography>}
                        </div> :
                        <div>
                            <Typography component="h1" variant="h5">Researchers have well-supported evidence that sleep
                                allows the brain to flush knowledge toward long-term memory. Enough facts for today!</Typography>
                            <p style={{margin: 10, boxShadow: "none", background: '#00000000', fontSize: 150}}
                            > 🤯 </p>
                        </div>
                    }
                </div>
            </CustomPaper>
        );
    }
}