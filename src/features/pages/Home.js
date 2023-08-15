import React from 'react'
import Navbar from "../navbar/Navbar"
import ProductList from '../product/components/ProductList'
import Footer from '../common/Footer'

const Home = () => {
  return (
    <>
         <Navbar>
         <ProductList/>

         </Navbar>
         <Footer/>
    </>
  )
}

export default Home