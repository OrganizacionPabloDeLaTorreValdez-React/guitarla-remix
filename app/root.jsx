import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header';
import Footer from '~/components/footer';
import Error from './components/error';
import { useEffect, useState } from 'react';

export function meta({data}) {
  return (
    [
      {charset: 'utf-8'},
      {viewport: 'width=device-width,initial-scale=1'},
      {title: 'GuitarLA - Remix'},
      {name: 'author', content: 'rbard'},
      {name: 'description', content: 'Este proyecto nos ayudará a aprender remix'},
    ]
  );
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    }, 
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap',
    },
    {
      rel: 'stylesheet',
      href:  styles,
    }, 
  ]
}

/** Manejo de errores */
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Document>
      <Error error={error}/>
    </Document>
  );
}

function Document({children}) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function App() {
  const [carrito, setCarrito] = useState(
      ( 
        typeof window !== 'undefined' ? 
        JSON.parse(localStorage.getItem('carrito')) : 
        []
      ) ?? []
    );

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarCarrito = (guitarra) => {
    const existeGuitarra = carrito.some((guitarraState) => guitarraState.id === guitarra?.id)
    if(!existeGuitarra) {
      // Registro nuevo, agregar al carrito
      setCarrito([...carrito, guitarra])
    } else {
      // Iterar sobre el arreglo, e identificar el elemento duplicado
      const carritoActualizado = carrito.map((guitarraState) => {
        if(guitarraState.id === guitarra?.id) {
          // Reescribir la cantidad
          guitarraState.cantidad = guitarra?.cantidad;
        }
        return guitarraState;
      });
      setCarrito(carritoActualizado);
    }
  }

  const eliminarGuitarra = (id) => {
    const carritoActualizado = carrito.filter((guitarraState) => guitarraState.id !== id);
    setCarrito(carritoActualizado);
  }

  const updateCantidad = (guitarra) => {
    const carritoActualizado = carrito.map((guitarraState) => {
      if(guitarraState.id === guitarra?.id) {
        guitarraState.cantidad = guitarra?.cantidad;
      }
      return guitarraState;
    })
    setCarrito(carritoActualizado);
  };

  return (
    <Document>
      <Outlet 
        context={{
          carrito,
          agregarCarrito,
          eliminarGuitarra,
          updateCantidad
        }}
      />
    </Document>
  );
};

export default App;