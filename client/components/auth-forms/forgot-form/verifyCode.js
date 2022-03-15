import React, { useState, useContext,useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import FormInput from '../../form-input'
import Button from '../../button'

import styles from './signup-form.module.css'

const VerifyCode = () => {
  const {setRetrieveCodeState, retrieveCode, announce  } = useContext(AuthContext)
  const { setIsComponentVisible } = useContext(ModalContext)
  
  const [loading, setLoading] = useState(false)
  const [announceEr, setAnnounceEre] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [timeLeft,setTimeLeft] = useState(59);
  const { handleComponentVisible } = useContext(ModalContext)
  const handleChangeCode = (e) =>{      
        setCodeInput(e.target.value)
  }
  const OnsubmitCode = (e)=>{
      e.preventDefault();
        if(Number(codeInput) !== retrieveCode){
                setAnnounceEre("Mã xác nhận không đúng");
        }else{
             
            handleComponentVisible(true, 'authenticate')
        }
  }
  
  useEffect(()=>{
    if(timeLeft > 0 ){
      setTimeout(() =>{
        setTimeLeft(timeLeft - 1)
      },1000);
    }
    else{
      setTimeLeft("Mã xác nhận đã hết hạn")
      setRetrieveCodeState(123)
    }
  },[timeLeft])
  return (
    <>    
         <Formik
            initialValues={{ veriFyCode: codeInput }}
            onSubmit={async (values = codeInput, { setStatus, resetForm }) => {
              setLoading(true)
              try {
                console.log(values)                             
               

                resetForm({})
                setIsComponentVisible(false)
              } catch (error) {
                setStatus(error.response.data.message)
              }
              setLoading(false)
              handleComponentVisible(true, 've')
            }}
            validationSchema={Yup.object({
              veriFyCode: Yup.string()
                .required('Required')
                .matches(retrieveCode,"Mã xác nhận không chính xác")
            })}
          >
            {({               
              handleBlur,   
              isSubmitting
            }) => (
              <form onSubmit={OnsubmitCode} className={styles.form}>
                <FormInput
                  label="Mã xác nhận"
                  type="text"
                  name="verify"
                  autoComplete="off"
                
                  onChange={handleChangeCode}
                  onBlur={handleBlur}
                 
                />

                {
                  timeLeft > 0 
                  ? <p className={styles.status}>{announceEr ? announceEr : announce}</p>
                  : ''
                }
                <p className={styles.status}>{timeLeft > 0 ? "Thời gian còn lại của mã: "+timeLeft : timeLeft}</p>
                <Button
                  primary
                  full
                  className={styles.submitButton}
                  disabled={isSubmitting}
                  isLoading={loading}
                  type="submit"
                >
                  Xác nhận
                </Button>
              </form>
            )}
          </Formik>
      

    </>
  )
}

export default VerifyCode
