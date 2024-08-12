import Form from '../Form'
import { UserDataType } from '../types'
import { register, resetStatus } from '../store/authSlice'
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Status } from '../../../globals/types/types'

const Register = () => {
  const navigate=useNavigate()
  const {status}=useAppSelector((state)=>state.auth) //"auth" store ko reducer bhitra bata ayo  //check status
  console.log(status)
  const dispatch=useAppDispatch()

  //handleRegister
  const handleRegister=(data:UserDataType)=>{
    dispatch(register(data))
  }

  useEffect(()=>{
    if(status===Status.SUCCESS){
      dispatch(resetStatus())  //after success then reset the status to  "loading" then navigate
      navigate("/login")
    }
  },[status,navigate,dispatch])

  return (
    <>
       <Form type="register" onSubmit={handleRegister} />
    </>
  )
}

export default Register
