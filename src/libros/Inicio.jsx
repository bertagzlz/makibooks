import { Routes, Route, Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import 'semantic-ui-css/semantic.min.css'
import './paginas.css'
import {FormBusqueda} from '../Components/FormBusqueda';
import Carrusel from '../Components/Carrusel';
import Contenedor from '../Components/Contenedor';
import Carta from '../Components/Carta';
import Footer from '../Components/Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import React, {useState} from "react";
import {Header} from "semantic-ui-react";
import Libro from "../Components/Libro";

export { Inicio };

function Inicio() {
    const libros = useSelector(x => x.libros.list);
    const dispatch = useDispatch();

    const [isSearch, setIsSearch]=useState(0);


    return (
            <div className="p-4">
                {isSearch
                    ? <div className="p-5 bg light">
                        {libros && libros.map(libro =>
                            <div key={libro.id}>
                                <Header as='h3'>Categoría: {libro.categoria}</Header>
                                {/*<Libro libro={libro} childToParent={childToParent}/>*/}
                                <Libro libro={libro}/>
                            </div>
                        )}
                        {!libros &&
                        <div>
                            <p  className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </p>
                        </div>
                        }
                        {libros && !libros.length &&
                        <div>
                            <p className="p-2 text-center">No hay libros para presentar</p>
                        </div>
                        }
                    </div>
                    : <div><div className="container">


                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px'
                        }}>
                            {/*<FormBusqueda/>*/}
                            <div id="contenedor-carrusel">
                                <Carrusel/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <div id='primer-contenedor'>
                            <Contenedor
                                titulo='Los libros más populares del momento'
                                contenido='Aquí encontrarás una selección cuidadosamente elegida de los títulos más leídos y recomendados por nuestros usuarios. Explora nuestras recomendaciones y descubre nuevas lecturas emocionantes y enriquecedoras.'/>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div id='seg-contenedor' style={{display: 'flex', alignItems: 'center'}}>
                            <img src={process.env.PUBLIC_URL + '/imgs/book_8.jpg'}
                                 style={{width: '40%', height: '0%', zIndex: 1}}/>
                            {/*<div style={{ marginLeft: '-34%', marginRight: '-20%', width: '100%' }}>*/}
                            <Contenedor
                                titulo='Nuestra biblioteca digital'
                                contenido='Bienvenidos a nuestra biblioteca digital, donde podrás encontrar una amplia selección de libros digitales de diversas categorías. Nuestra biblioteca digital ofrece una gran variedad de opciones para satisfacer tus necesidades de lectura. Además, nos enorgullece ofrecer libros en diferentes formatos y idiomas para garantizar que todos puedan disfrutar de la lectura sin barreras. Explora nuestra colección y sumérgete en el mundo de la literatura digital.'/>
                            {/*</div>*/}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div id='cartas' style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: "#F5F9FA"
                        }}>{/*,padding: '3% 5% 4% 2%' }}>*/}
                            <div id='cartas-st-row' style={{display: 'flex', flexDirection: 'row', paddingBottom: '2%'}}>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_1.jpg'}
                                    titulo='LIBROS'
                                    link='Nuestra librería →'
                                    contenido='Explora nuestra amplia selección de libros en diferentes géneros y descubre nuevas historias que te llevarán a mundos fascinantes.'/>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_2.jpg'}
                                    titulo='SEGUNDA MANO'
                                    link='Échales un vistazo →'
                                    contenido='Todos nuestros libros usados han sido cuidadosamente seleccionados y están en excelentes condiciones.'/>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_3.jpg'}
                                    titulo='EVENTOS LITERARIOS'
                                    link='Apúntate →'
                                    contenido='Encontrarás información sobre los próximos eventos, charlas y presentaciones de libros en nuestra comunidad.'/>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_4.jpg'}
                                    titulo='LIBROS RAROS'
                                    link='Descubrélos →'
                                    contenido='Fascínate con nuestra selección de libros antiguos, ediciones limitadas, y obras únicas de todo el mundo al alcance de tu mano.'/>
                            </div>
                            <div style={{clear: 'both'}}/>
                            <div id='cartas-nd-row' style={{display: 'flex', flexDirection: 'row'}}>
                                <Contenedor titulo='Ve más allá'
                                            contenido='Descubre más allá de lo que ya conoces. Aquí encontrarás sugerencias de lecturas relacionadas con tus intereses, artículos y reseñas de libros, así como noticias y eventos literarios.'/>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_5.jpg'}
                                    titulo='LIBROS'
                                    contenido='Libros de fantasía'/>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_6.jpg'}
                                    titulo='LIBROS'
                                    contenido='Grandes autoras de todos los tiempos'/>
                                <Carta
                                    imagen={process.env.PUBLIC_URL + '/imgs/book_7.jpg'}
                                    titulo='LIBROS'
                                    contenido='Memorias y biografías'/>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                        <Footer/></div>
                }

            </div>

    );
}
