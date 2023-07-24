import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const fotos = [
  {
    url: process.env.PUBLIC_URL + '/imgs/carru_1.jpg',
    alt: 'Imagen 1',
  },
  {
    url: process.env.PUBLIC_URL + '/imgs/carru_2.jpg',
    alt: 'Imagen 2',
  },
  {
    url: process.env.PUBLIC_URL + '/imgs/carru_3.jpg',
    alt: 'Imagen 3',
  },
];

const Carrusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 5000,
    speed: 1000,
    cssEase: "linear"
  };

  return (
    <Slider {...settings}>
      {fotos.map((foto) => (
        <div key={foto.alt}>
          <img src={foto.url} alt={foto.alt} style={{ height: '45%', width: '60%' }} />
        </div>
      ))}
    </Slider>
  );
};

export default Carrusel;
