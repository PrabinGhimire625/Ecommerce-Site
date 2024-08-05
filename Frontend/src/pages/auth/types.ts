export interface Props{
    type:string,
    onSubmit: (data:UserDataType)=>void
  }

export interface UserDataType{
    username:string,
    email:string,
    password:string
}

export interface UserLoginType{
  email:string,
  password:string
}