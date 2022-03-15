import React, { useState,useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { publicFetch } from '../../../util/fetcher'
import { AuthContext } from '../../../store/auth'
import ModalContext from '../../../store/modal'

import FormInput from '../../form-input'
import Button from '../../button'

import styles from './signup-form.module.css'

const ForgotForm = () => {
  const { setInfoState, setRetrieveCodeState, setAnnounceState } = useContext(AuthContext)
  const { setIsComponentVisible,handleComponentVisible } = useContext(ModalContext)

  const [loading, setLoading] = useState(false)


  function randomNumber(len) {
    var re = 0;
    for (let i = 0; i < len; i++) {
      re *= 10;
      re += Math.floor(Math.random() * 10) % 10;
    }
    return re;
  }
  return (
    <>
      
          <Formik
            initialValues={{ email: '' }}
            onSubmit={async (values, { setStatus, resetForm }) => {
              setLoading(true)

              try {
                var request = {
                  params: {
                    email: values.email
                  }
                };
                const userEmail = await publicFetch.get(`user/find`, request);

                if (userEmail) {
                  const { data } = userEmail;
                  const { userInfo } = data;
                 
                  setInfoState(userInfo)
                  var code = randomNumber(6);
                  setRetrieveCodeState(code);
                  var requestCode = {
                    email: userInfo.email,
                    subject: "Xác nhận đổi mật khẩu",
                    htmlContent: "Mã xác nhận của bạn là: " + code,
                  };
                }

                const mess  = await publicFetch.post("/user/sendEmail", requestCode)
                if(mess){
                  const {data} = mess;
                  setAnnounceState(data.message);
                }           
                resetForm({})       
                setIsComponentVisible(false)
              } catch (error) {
                setStatus(error.response.data.message)
              }
              setLoading(false)
              handleComponentVisible(true, 'verify')
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required('Required')
                .matches(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ),
            })}
          >
            {({
              values,
              errors,
              touched,
              status,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormInput
                  label="Email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  hasError={touched.email && errors.email}
                  errorMessage="Email is invalid"
                />

                <p className={styles.status}>{status}</p>
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

export default ForgotForm
