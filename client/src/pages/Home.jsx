import React from 'react'
import { Header } from '../components/Header'
import Navbar from '../components/Navbar'
import '../components/styles/home.css'
import Main from '../components/Main'
import { Footer } from '../components/Footer'

const Home = () => {
  return (
    <div className='main-contenedor'>
        <Header color='pag'/>
        <Navbar/>
        <Main/>
        <Footer/>
    </div>
  )
}

export default Home