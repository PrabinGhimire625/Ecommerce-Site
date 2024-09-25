import React from 'react'
import Category from '../../globals/components/sidebar/Category'
import Home from '../auth/home/Home'

const Landing = () => {
  return (
    <div className="flex h-screen bg-gray-100">
    <Category/>

    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
        <div className="p-4">
           <Home/>
        </div>
    </div>
 </div>
  )
}

export default Landing
