import { getGuitarras } from "../models/guitarras.server";
import { useLoaderData } from "@remix-run/react";
import ListadoGuitarras from "../components/listado-guitarras";

export function meta({matches}) {
  const rootMeta = matches[0].meta;
  const newMeta = rootMeta.filter(meta => meta.name !== 'description' && !meta.title);

  return [
    {title: 'GuitarLA - Tienda de Guitarras'},
    {name: 'description', content: 'GuitarLA - Nuestra colección de guitarras'},
    ...newMeta,
  ];
}

// remix ejecuta el loader del lado del servidor
export async function loader() {
  const guitarras = await getGuitarras();
  return guitarras?.data;
}

function Tienda() {
  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <h2 className="heading">nuestra colección</h2>
      <ListadoGuitarras 
        guitarras={guitarras}
      />
    </main>
  );
}

export default Tienda;