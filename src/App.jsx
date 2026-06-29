import { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Body from './components/Body'

import './App.css'

function App() {


  return (
    <>
    <div className="flex flex-col min-h-screen">
    <Nav />
    <div className="flex-1 bg-[#b8e3e9]">
    <Body />
    </div>
    <Footer />
    </div>
    </>
  )
}

export default App
