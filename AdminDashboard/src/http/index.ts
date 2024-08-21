import axios from "axios"

//request header "Content-Type"
//respose header "Accept"

const API=axios.create({
    baseURL:"http://localhost:3000/",
    headers:{
        'Content-Type':"application/json",
        'Accept':"application/json"
    }
})

const APIAuthenticated=axios.create({
    baseURL:"http://localhost:3000/",
    headers:{
        'Content-Type':"application/json",
        'Accept':"application/json",
        'Authorization': `${localStorage.getItem('token')}`
    }
})

export {API,APIAuthenticated}