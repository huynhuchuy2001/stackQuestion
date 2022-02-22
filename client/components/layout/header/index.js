import React, { useEffect, useContext,useState } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import { useRouter } from "next/router";
import useComponentVisible from '../../../hooks/useComponentVisible'
import useWindowSize from '../../../hooks/useWindowSize'
import CONST from '../../../constants'
import ModalContext from '../../../store/modal'
import { AuthContext } from '../../../store/auth'

import Button from '../../button'
import NavigationDropdown from '../../navigation-dropdown'
import { Menu, Close, Logo } from '../../icons'

import styles from './header.module.css'

const Header = ({ className, ...props }) => {
  const router = useRouter();
  const { handleComponentVisible } = useContext(ModalContext)
  const { isAuthenticated, authState, logout } = useContext(AuthContext)
  const [contentInput,setContentInput] = useState('')
 
  const {
    ref,
    toggleRef,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const size = useWindowSize()

  useEffect(() => {
    if (size.width > CONST.MOBILE_SIZE) {
      setIsComponentVisible(false)
    }
  }, [size])
  
/*   const showOption = async () => {
      /* const {data} = await publicFetch.get(`/question/${}`) */
/*     console.log("sds")
  } */ 
  const handleInput = (e) =>{
    setContentInput(e.target.value)
    
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if(contentInput !== ''){
      router.push({
        pathname:'/',
        query:{
          keyWord:contentInput
        }
      })
    }else{
      router.push("/")
    }
   
    
  }
  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.container}>
        <div ref={toggleRef} className={styles.menuContainer}>
          <Button
            className={styles.menu}
            onClick={() => setIsComponentVisible((isOpen) => !isOpen)}
          >
            {isComponentVisible ? <Close /> : <Menu />}
          </Button>
        </div>
        <Button className={styles.logo} href="/">
          <Logo />
          <p>
            ss<span>overflow</span>
          </p>
        </Button>
        <div style={{ flex: 1, marginRight: 5, marginLeft: 5 }}>
          <form onSubmit={handleSubmit}>
             <input className={styles.findBox} type='text' onChange={handleInput}/*  onClick={() => {showOption()}} */ />
          </form>
             
         
         
        </div>

        {isAuthenticated() ? (
          <div className={styles.userInfo}>
            <p>
              Welcome{' '}
              <Link
                href="/users/[user]"
                as={`/users/${authState.userInfo.username}`}
              >
                <a>{authState.userInfo.username}!</a>
              </Link>
            </p>
            <a onClick={() => logout()}>log out</a>
          </div>
        ) : (
          <>
            <Button
              className={cn(styles.auth, styles.authLo)}
              secondary
              onClick={() => handleComponentVisible(true, 'login')}
            >
              Log in
            </Button>
            <Button
              className={cn(styles.auth, styles.authRe)}
              primary
              onClick={() => handleComponentVisible(true, 'signup')}
            >
              Sign up
            </Button>
          </>
        )}
      </div>

      <div ref={ref}>{isComponentVisible && <NavigationDropdown />}</div>
    </header>
  )
}

export default Header
