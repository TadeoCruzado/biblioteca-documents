import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Agregar from './pages/Agregar'
import Home from './pages/Home'
import { Libros } from './pages/Libros'
import LibroInfo from './pages/LibroInfo'
import { LibroContextProvider } from './context/LibroProvider'

const App = () => {
  return (
    <LibroContextProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/agregar' element={<Agregar/>}/>
        <Route path='/libros' element={<Libros/>}/>
        <Route path='/libros/:id' element={<LibroInfo/>}/>
        <Route path='/editar/:id' element={<Agregar/>}/>
        <Route path='/autores' element={<div>Autores</div>}/>
        <Route path='*' element={<div>Pagina no encontrada</div>}/>
      </Routes>
    </LibroContextProvider>
  )
}

export default App