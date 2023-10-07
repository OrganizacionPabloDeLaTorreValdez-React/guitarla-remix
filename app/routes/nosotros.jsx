import styles from '~/styles/nosotros.css';
import NosotrosImg from '../../public/img/nosotros.jpg';

export function meta({matches}) {
  // getting the root meta
  const rootMeta = matches[0].meta;
  // generate a meta without title and description
  const newMeta = rootMeta.filter(metaObj => metaObj.name !== 'description' && !metaObj.title);
  return [
    {title: 'GuitarLA - Sobre Nosotros'},
    {name: 'description', content: 'Venta de guitarras, blog de música'},
    ...newMeta,
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      // preload -> quiere decir que tan pronto cargues toda la información,
      // carga esta imagen porque pueden ser muy pesada
      rel: 'preload',
      href: NosotrosImg,
      as: 'image',
    }
  ];
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={NosotrosImg} alt="imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quas sint facere similique? Rerum qui dolores hic sequi. Accusantium debitis mollitia quaerat in soluta consectetur consequuntur modi asperiores quos sed similique rerum, dolores odio optio dolor eos vel sapiente natus fuga laborum doloremque magnam eius corrupti. Corporis eveniet maxime dolores.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quos tempore odio accusantium magnam pariatur voluptatum cupiditate provident eligendi, fugiat similique voluptatibus porro debitis? Aut, tempora odit provident, eos corporis laborum, amet obcaecati iure officiis aspernatur animi fuga ratione soluta accusamus nihil sequi eius. Sequi sit quia ipsum quasi consequuntur.
          </p>
        </div>
      </div>
    </main>
  );
}

export default Nosotros;