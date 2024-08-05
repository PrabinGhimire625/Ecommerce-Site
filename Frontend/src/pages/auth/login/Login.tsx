import React, { useEffect } from 'react'
import Form from '../Form'
import { login, resetStatus } from '../../../store/authSlice'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { UserDataType, UserLoginType } from '../types'
import { Status } from '../../../globals/types/types'

const Login = () => {
  const navigate=useNavigate()
  const {status}=useAppSelector((state)=>state.auth) //auth store ko reducer bhitra bata ayo  //check status
  const dispatch=useAppDispatch()

  //handlelogin
  const handleLogin=(data:UserLoginType)=>{
    dispatch(login(data))
  }

  useEffect(()=>{
    if(status===Status.SUCCESS){
      dispatch(resetStatus())  //after success then reset the status to  "loading" then navigate
      navigate("/")
    }
  },[status,navigate,dispatch])



  return (
    <>
      <Form type="login" onSubmit={handleLogin} />
    </>
  )
}

export default Login
