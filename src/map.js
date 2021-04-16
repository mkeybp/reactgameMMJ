// function drawMap(info, ground, clutter, moveables, effects) {
//     //let info = []
// }
import React, { useState } from 'react';


let numbers = [1, 2, 3];


function Component(props) {
    return <>{
        numbers.map(n => <ImageComponent number={n} />)
    }</>
}


function ImageComponent(props) {
    return <>{
        <p>Number: <i>{props.number}</i></p>
}</>
}



export default Component