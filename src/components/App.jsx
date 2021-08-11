import React from "react";
import { useReducer, useEffect, useState } from 'react';
import './App.css';

const initialState = {
    started: false,
    speed: 0,
    gear: 0,
    distance: 0,
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [distance, setDistance] = useState(0);
    let [meter, setMeter] = useState(0);

    function reducer(previousState, action) {
    
        switch(action.type) {
            case "start":
                if (previousState.started === true) {
                    return { 
                        started: false,
                        speed: previousState.speed,
                        gear: 0,
                        distance: previousState.distance,
                    }
                } else {
                    if (Math.round(Math.random()) === 0) {
                        return { 
                            started: true,
                            speed: previousState.speed,
                            gear: 0,
                            distance: previousState.distance,
                        }
                    }
                    return previousState;
                }
            case "shift-up":
                if (previousState.started === true && previousState.gear < 5) {
                    return { 
                        started: true,
                        speed: previousState.speed,
                        gear: previousState.gear + 1,
                        distance: previousState.distance,
                    }
                }
                return previousState;
            case "shift-down":
                if (previousState.started === true && previousState.gear > -2) {
                    return { 
                        started: true,
                        speed: previousState.speed,
                        gear: previousState.gear - 1,
                        distance: previousState.distance,
                    }
                }   
                return previousState;
            case "accelerate":
                if (previousState.speed < 200 && previousState.speed > -40) {
                    switch(previousState.gear) {
                        case 0:
                            return previousState;
                        case 1:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed + 5,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                        case 2:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed + 10,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                        case 3:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed + 20,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                        case 4:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed + 40,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                        case 5:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed + 80,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                        case -1:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed - 5,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                        case -2:
                            return { 
                                started: previousState.started,
                                speed: previousState.speed - 10,
                                gear: previousState.gear,
                                distance: previousState.distance,
                            }
                    }
                } 
                return previousState;
            case "brake":
                if (previousState.speed >= 20) {
                    return { 
                        started: previousState.started,
                        speed: previousState.speed - 20,
                        gear: previousState.gear,
                        distance: previousState.distance,
                    }
                } else if (previousState.speed <= -20) {
                    return { 
                        started: previousState.started,
                        speed: previousState.speed + 20,
                        gear: previousState.gear,
                        distance: previousState.distance,
                    }
                } else {
                    return { 
                        started: previousState.started,
                        speed: 0,
                        gear: previousState.gear,
                        distance: previousState.distance,
                    }
                }
        }
    }

    useEffect(() => {
        setInterval(() => {
            setMeter(meter++);
        }, 2000);
    }, [])

    useEffect(() => {
        setDistance(distance + state.speed);
    }, [meter])

    return (
        <div id="dashboard">
            <div className={`started-${state.started}`}>Engine</div>
            <div id="speedometer">
                Speed: { state.speed } <br />
                Gear: { state.gear } <br />
                Distance: { distance }
            </div>

            <div id="buttons">
                <button id="start" onClick={() => dispatch({ type: "start" })}>
                    Start / <br />
                    Stop
                </button>
                <div className="box">
                    <button className="shift-up" onClick={() => dispatch({ type: "shift-up" })}>
                        Shift-up
                    </button>
                    <button className="shift-down" onClick={() => dispatch({ type: "shift-down" })}>
                        Shift-down
                    </button>
                </div>
                <div className="box">
                    <button className="shift-up" onClick={() => dispatch({ type: "accelerate" })}>
                        Accelerator
                    </button>
                    <button className="shift-down" onClick={() => dispatch({ type: "brake" })}>
                        Brake
                    </button>
                </div>
            </div>

        </div>
    )
}

export default App;