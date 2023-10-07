import { useOutletContext } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ClientOnly } from "remix-utils";
import styles from "~/styles/carrito.css";

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    }
  ];
}

export function meta({matches}) {
  const rootMeta = matches[0].meta;
  const newMeta = rootMeta.filter(meta => meta.name !== 'description' && !meta.title);

  return [
    {title: 'GuitarLA - Carrito de compras'},
    {name: 'description', content: 'Venta de guitarras, música, blog, carrito de compras, tienda'},
    ...newMeta,
  ];
}

function Carrito() {
  const [total,setTotal] = useState(0);
  const {carrito, eliminarGuitarra, updateCantidad} = useOutletContext();

  useEffect(() => {
    const calculoTotal = carrito.reduce((acc, carritoState) => acc + 
      (Number.parseInt(carritoState.cantidad) * Number.parseInt(carritoState.precio)), 0);
    setTotal(calculoTotal);
  }, [carrito]);

  const getOptionSize = () => {
    const options = [];
    for(let i = 1; i <= 10; i++) {
      options.push(i);
    }
    return options;
  };

  return (
    <ClientOnly fallback={'cargando...'}>
      {() => (
        <main className="contenedor">
          <h1 className="heading">Carrito de Compras</h1>
          <div className="contenido">
            <div className="carrito">
              <h2>Articulos</h2>
              {
                carrito.length ? 
                carrito.map(producto => (
                  <div key={producto?.id} className="producto">
                    <div>
                      <img src={producto?.imagen} alt={`Imagen del producto ${producto?.nombre}`} />
                    </div>
                    <div>
                      <p className="nombre">{producto?.nombre}</p>
                      <p className="cantidad">Cantidad: </p>
                      <select
                        className="select"
                        value={producto?.cantidad}
                        onChange={(e) => updateCantidad({
                          cantidad: Number.parseInt(e.target.value),
                          id: producto?.id,
                        })}
                      >
                        {
                          getOptionSize().map((n,ind) => (
                            <option key={ind} value={n}>{n}</option>
                          ))
                        }
                      </select>
                      <p className="precio">$ <span>{producto?.precio}</span></p>
                      <p className="subtotal">Subtotal: $ <span>{producto?.cantidad * producto?.precio}</span></p>
                    </div>
                    <button
                      type="button"
                      className="btn_eliminar"
                      onClick={() => eliminarGuitarra(producto?.id)}
                    >X</button>
                  </div>
                )) : 
                'Carrito vacío'
              }
            </div>
            <aside className="resumen">
              <h3>Resumen del pedido</h3>
              <p>Total a pagar: ${total}</p>
            </aside>
          </div>
        </main>
      )}
    </ClientOnly>
  );
}

export default Carrito;