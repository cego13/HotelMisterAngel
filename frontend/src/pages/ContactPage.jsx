import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/ContactPage.css';

const ContactPage = () => {
  useEffect(() => {
    // Mueve el scroll a la parte superior al cargar la página
    window.scrollTo(0, 100); 
  }, []); // Se ejecuta solo una vez, cuando el componente se monta

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <div className="contact-content">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. Puedes visitarnos o comunicarte a través de los siguientes medios:</p>

          <div className="contact-info">
            <p><strong>Dirección:</strong> Calle 123, Rivera, Huila</p>
            <p><strong>Teléfono:</strong> +57 300 123 4567</p>
            <p><strong>Email:</strong> contacto@hotelrivera.com</p>
          </div>

          <div className="map-container">
            <iframe
              title="Ubicación Hotel Mister Angel"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.007915658036!2d-75.2452463!3d2.7793784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b751771e4fef1%3A0x2594a63a017ac33d!2sRivera%2C%20Huila!5e0!3m2!1ses!2sco!4v1713807637123!5m2!1ses!2sco"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
