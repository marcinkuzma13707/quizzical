import React from 'react'
import {nanoid} from "nanoid"

function Question(props){
    return(
        <div>{props.question.question}</div>
    )
}

export default Question