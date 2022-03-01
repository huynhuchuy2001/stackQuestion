import React from 'react'
import styles from './question-stats.module.css'

const QuestionStats = ({ voteCount, answerCount, view  }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vote}>
        <span>{voteCount}</span>
        <p>votes</p>
      </div>
      <div className={answerCount > 0 ? styles.highlight_answer : styles.answer}>
        <span>{answerCount}</span>
        <p>answers</p>
      </div>
      <div className={styles.view}>
        <span>
          {Number(view) > 1000 && Number(view) < 999999 
          ? (parseInt(Number(view)/1000))+'k' 
          : Number(view) > 1000 * 1000 && Number(view) < (10000 * 10000) - 1 
          ? (parseInt(Number(view)/(1000 * 1000)))+'m'  
          : view}
        </span>
        <p>views</p>
      </div>
    </div>
  )
}

export default QuestionStats
