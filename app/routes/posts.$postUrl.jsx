import { useLoaderData, useRouteError } from "@remix-run/react";
import { getPost } from "~/models/posts.server";
import Error from "../components/error";
import { formatearFecha } from "../utils/helpers";

export function meta({matches, data}) {
  const rootMeta = matches[0].meta;
  const newMeta = rootMeta.filter(meta => meta.name !== 'description' && !meta.title);

  return [
    {
      title: (!data) ?
      'GuitarLA - Entrada no encontrada' :
      `GuitarLA - ${data.titulo}`
    },
    {
      name: 'description', 
      content: (!data) ? 
      'Post, post de guitarras, entrada no encontrada' :
      `Posts, post de guitarras, post ${data.titulo}`
    },
    ...newMeta,
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Error error={error} />
  );
}

export async function loader({
  params,
}) {
  const postUrl = params.postUrl;
  const post = await getPost(postUrl);

  if(!post?.data || post?.data?.length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Post no encontrado',
    });
  }

  return post?.data[0]?.attributes;
}

function Post() {
  const post = useLoaderData();
  const { titulo, contenido, imagen, publishedAt }  = post;
  const formattedPublishedAt = formatearFecha(publishedAt);

  return (
    <article className="contenedor post">
      <img className="imagen" src={imagen?.data?.attributes?.formats?.medium?.url} alt={`imagen blog ${titulo}`} />
        <div className="contenido">
          <h3>{titulo}</h3>
          <p className="fecha">{formattedPublishedAt}</p>
          <p className="texto">{contenido}</p>
        </div>
    </article>
  );
}

export default Post;