import Question from './Question'
import Menu from './Menu'
import blob from './assets/blob.svg'
import {nanoid} from "nanoid"
import React, {useState, useEffect} from "react"

function App() {
  const [started, setStarted] = useState(false)
  const [count, setCount] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [checked, setChecked] = useState(false)
  const [questions, setQuestions] = useState([])

const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

useEffect(() =>{
  async function getQuestions(){
    const res = await fetch('https://opentdb.com/api.php?amount=5&encode=base64')
    const data = await res.json()
    const tmp = []
    data.results.forEach(q =>{
      tmp.push({
        id:nanoid(),
        question:q.question,
        correctAnswer:q.correct_answer,
        selected:null,
        checked:false,
        answers: shuffleArray([...q.incorrect_answers, q.correct_answer])
      })
    })
    setQuestions(tmp)
  }
  getQuestions()
}, [count])

const questionsSection = questions ? questions.map(q =>{
  return (
    <Question
    key={q.id}
    question={q}
    id={q.id}
    handleClickAnswer={handleClickAnswer}
    />
  )
}) : []

  function startQuiz(){
    setStarted(x => !x)
  }

  function handleEnd(checked){
    if(checked){
      setCount(count => count + 1)
      setChecked(false)
      return
    }

    let allSelected = true;
    questions.forEach(q =>{
      if(q.selected === null){
        allSelected = false
        return
      }
    })

    if(!allSelected)return

    setQuestions(prevQuestions => prevQuestions.map(q => {
      return {...q, checked:true}
    }))

    setChecked(true)
    let correct = 0;
    questions.forEach(q =>{
      if(q.selected === q.correctAnswer) correct++;
    })
    
    setCorrect(correct)
  }

  function handleClickAnswer(id,answer){
    setQuestions(questions => questions.map(q => {
      return q.id !== id
             ? q
             : {...q, selected:answer}
    }))
  }
  return (
    <div className="main-container">
      <div className="content-container">
          {
            started ? 
            <div className="start-content-container">
              {questionsSection}
              <div className="end-container">
                {checked && <span className="score"> You scored {correct} / {questions.length} correct answers</span>}
                <button className="check" onClick={() => handleEnd(checked)}>{checked ? "Play again" : "Check answers"}
                </button>
              </div>
            </div>
            : <Menu 
            startQuiz={startQuiz} 
            />
          }
      </div>
      <div className="blob-container">
        <img className="blob-svg" src={blob} alt="" />
      </div>
    </div>
  )
}

export default App
