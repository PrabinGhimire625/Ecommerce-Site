import React, { useEffect, useState } from 'react'
import Navbar from '../../../globals/components/navbar/Navbar'
import Card from '../../../globals/components/card/Card'
import Hero from './components/Hero'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { fetchProduct } from '../store/productSlice'

const Home = () => {
  const dispatch=useAppDispatch()
  //return obj
  const {status,product}=useAppSelector((state)=>state.products) //"products" store ko reducer bhitra bata ayo  //check status
  
  useEffect(()=>{
    dispatch(fetchProduct())
  },[])

console.log(product)

  return (
    <>
      <Hero/>
      <div className='flex flex-col items-center mt-8'>
      <h1 className='text-4xl font-bold text-center mb-6 text-gray-800'>Top products</h1>
       
       <div className="flex flex-wrap justify-center gap-6">
          
          {product.length>0 && product.map((pd)=>{
            return(
              <Card key={pd.id} data={pd} />
            )
          })}

       </div>
      </div>
    </>
  )
}

export default Home
