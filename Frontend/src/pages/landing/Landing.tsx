import React from 'react'
import Category from '../../globals/components/sidebar/Category'
import Home from '../auth/home/Home'
import Hero from '../auth/home/components/Hero'

const Landing = () => {
  return (
    <>
      <Hero/>

<div className="flex h-screen bg-gray-100">
  


<div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
  <Category/>

    <div className="p-4">
       <Home/>
    </div>
</div>
</div>
    </>
  )
}

export default Landing
