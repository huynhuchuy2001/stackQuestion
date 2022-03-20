import React, { useState, useContext } from 'react'

import { FetchContext } from '../../../store/fetch'

import TextArea from '../../textarea'
import Button from '../../button'

import styles from './add-comment.module.css'

const AddComment = ({
  questionId,
  answerId,
  setShowAddComment,
  setQuestion
}) => {
  const { authAxios } = useContext(FetchContext)



  const [comment, setComment] = useState('');
  const [status,setStatus] = useState('');
 

const handleChangeCM =(event, editor)  =>{ 
    const data = editor.getData()   
    setComment(data)
   
}
const handleSubmit = async (e) =>{
  e.preventDefault();
  if(comment.length < 1){
    setStatus("Nội dung không được trống")
  }else{  
    const { data } = await authAxios.post(
      `/comment/${questionId}/${answerId ? answerId : ''}`,
      {comment: comment}
    )
    setQuestion(data)
    setShowAddComment(false)
  }
}

  return (
    
        <form className={styles.container} onSubmit={handleSubmit}>
          <TextArea                 
             onChange={handleChangeCM}                 
            className={styles.textarea}       
          /> 
           
          <p className={styles.status}>{status}</p>
          <div>
            <Button
              className={styles.button}
              type="submit"
              primary
              
            >
              Add Comment
            </Button>
          </div>
        </form>
     
  )
}

export default AddComment
