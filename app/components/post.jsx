import { Link } from "@remix-run/react";
import { formatearFecha } from "~/utils/helpers";

function Post({post}) {
  const { contenido, imagen, titulo, url, publishedAt } = post;
  const formattedPublishedAt = formatearFecha(publishedAt);

  return (
    <article className="post">
      <img 
        className="imagen" 
        src={imagen?.data?.attributes?.formats?.medium?.url} 
        alt={`imagen blog ${titulo}`} 
      />
      <div className="contenido">
        <h3>{titulo}</h3>
        <p className="fecha">{formattedPublishedAt}</p>
        <p className="resumen">{contenido}</p>
        <Link
          className="enlace"
          to={`/posts/${url}`}
        >
          Leer Post
        </Link>
      </div>
    </article>
  );
}

export default Post;