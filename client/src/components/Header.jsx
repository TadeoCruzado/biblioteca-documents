import { Link } from 'react-router-dom';
import './styles/header.css'
import { useEffect, useState } from 'react';

export const Header = (props) => {
    
    const [scrolling, setScrolling] = useState(false)
    const [menu, setMenu] = useState(false);

    const handleScroll = () =>{
        if(window.scrollY > 150){
            setScrolling(true)
        }else {
            setScrolling(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        return () =>{
            window.removeEventListener('scroll', handleScroll);
        }
    })

    const HeaderScroll = scrolling ? 'header-container-bl': '';

    const closeMenu= () =>{
        setMenu(false);
        document.body.style.overflow = 'auto'
    }
    const openMenu= () =>{
        setMenu(true);
        document.body.style.overflow = 'hidden'
    }
    const btnCloseMenu = menu ? 'btn-close-menu-active' : '';
    const overlay = menu ? 'overlay-open' : 'overlay-close';
    const listOpen = menu ? 'list-subs-active' : '';
    const elementListOpen = menu ? 'element-list-subs-active': '';

  return (
    <header className={props.color != 'pag' ? `header-contendor ${HeaderScroll} header-pags`: `header-contenedor ${HeaderScroll}`} id='header'>
        <div className={overlay} id='overlay'>
            <button className={`btn-close-menu ${btnCloseMenu}`} id='btn-close-menu' onClick={closeMenu}>
                <i className='bx bx-x'></i>
            </button>            
            <ul className={`list-subs ${listOpen}`}>
                <li className={`element-list-subs ${elementListOpen}`}>
                    <Link>Libros</Link>
                    </li>
                <li className={`element-list-subs ${elementListOpen}`}>
                    <a href='#footer'>Autores</a>
                </li>
            </ul>
        </div>
        <div className='menu-btn'>
            <button className= "btn-click" onClick={openMenu}>
                <i className='bx bx-menu' ></i>
            </button>                             
        </div>
        <div className='header-bar'>
            <div className='border-rg nomenu'>
                <Link to='/libros'>Libros</Link>
            </div>
            <div className='titulos'>
                <Link to='/'>
                    Biblioteca Virtual
                </Link>
            </div>
            <div className='border-lft nomenu'>
                <Link to='/agregar'>Agregar</Link>
            </div>            
        </div>
    </header>
  )
}
