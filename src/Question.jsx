import React from 'react'
import {nanoid} from "nanoid"

function Question(props){

    const answers = props.question.answers.map(a =>{
        var decodedAnswer = atob(a)
        let id = null;
        if(props.question.checked){
            if(props.question.correctAnswer === a){
                id = 'correct'
            }
            else if(props.question.selected === a){
             id = 'incorrect'
            }
            else{
                id = 'not-selected'
            }
        }
        return (
            <button 
             id={id}
             key={a} 
             className={a===props.question.selected ? 'answer selected' : 'answer'}
             onClick={() => handleClick(a)}>{decodedAnswer}</button>
        )
    })

    function handleClick(a){
        if(props.question.checked) return
        props.handleClickAnswer(props.id,a)
    }

    return(
        <div className="question-container">
            <h3 className="question-title">{atob(props.question.question)}</h3>
            {answers}
            </div>
    )
}

export default Question