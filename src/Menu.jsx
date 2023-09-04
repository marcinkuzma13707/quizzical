import React from 'react'

function Menu(props){
    return (
        <div className='menu'>
            <h1>Quizzical</h1>
            <span className="page-description">Description</span>
            <button className="start-button" onClick={() => props.startQuiz()}>Start quiz</button>
        </div>
    )
}

export default Menu