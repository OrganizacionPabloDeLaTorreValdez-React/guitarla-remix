import { getGuitarra } from "../models/guitarras.server";
import { useLoaderData, useOutletContext, useRouteError } from "@remix-run/react";
import Error from "../components/error";
import { useState } from "react";

export function meta({matches, data}) {
  const rootMeta = matches[0].meta;
  const newMeta = rootMeta.filter(meta => meta.name !== 'description' & !meta.title);

  return [
    {
      title: ((!data) ? 
        'GuitarLA - No encontrada' : 
        `GuitarLA - ${data?.nombre}`)
    },
    {
      name: 'description', 
      content: (!data) ? 
        'Guitarras, venta de guitarras, guitarra no encontrada' : 
        `Guitarras, venta de guitarras, guitarra ${data?.nombre}`},
    ...newMeta,
  ]
}

/** Manejor de errores */
export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Error error={error} />
  );
}

export async function loader({
  params,
}) {
  const { guitarraUrl } = params;
  const guitarra = await getGuitarra(guitarraUrl);

  if(!guitarra?.data || guitarra?.data?.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Guitarra no encontrada',
    });
  }

  return guitarra?.data[0];
}

function Guitarra() {
  const { agregarCarrito } = useOutletContext();
  const [ cantidad, setCantidad ] = useState(0);

  const guitarra = useLoaderData();
  const { nombre, descripcion, imagen, precio } = guitarra?.attributes;

  const getOptionList = () => {
    const optionArray = [];
    for(let i = 1; i<=10; i++) {
      optionArray.push(i);
    }
    return optionArray;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(cantidad < 1) {
      alert('Debes seleccionar un cantidad')
      return;
    }

    const guitarraSeleccionada = {
      id: guitarra?.id,
      imagen: imagen?.data?.attributes?.url,
      nombre,
      precio,
      cantidad,
    }

    agregarCarrito(guitarraSeleccionada);
  }

  return (
    <div className="contenedor guitarra">
      <img className="imagen" src={imagen?.data?.attributes?.url} alt={`Imagen de la guitarra ${nombre}`} />
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">
          {descripcion}
        </p>
        <p className="precio">
          {`$ ${precio}`}
        </p>
        <form 
          className="formulario"
          onSubmit={handleSubmit}
        >
          <label htmlFor="cantidad">Cantidad</label>
          <select 
            name="cantidad" id="cantidad"
            onChange={(e) => setCantidad(Number.parseInt(e.target.value))}
          >
            <option value="0">-- Seleccione --</option>
            {
              getOptionList().map((n, ind) => (
                <option key={ind} value={n}>{n}</option>
              ))
            }
          </select>
          <input 
            type="submit" 
            value="Agregar al carrito"
          />
        </form>
      </div>
    </div>
  );
}

export default Guitarra;