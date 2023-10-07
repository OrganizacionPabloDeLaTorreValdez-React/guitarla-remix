import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server";
import { getPosts } from "~/models/posts.server";
import { getCurso } from "~/models/curso.server";
import ListadoGuitarras from "../components/listado-guitarras";
import ListadoPosts from "../components/listado-posts";
import guitarraStyles from "~/styles/guitarras.css";
import postsStyles from "~/styles/blog.css";
import cursoStyle from "~/styles/curso.css";
import Curso from "~/components/curso";

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: guitarraStyles,
    },
    {
      rel: 'stylesheet',
      href: postsStyles,
    },
    {
      rel: 'stylesheet',
      href: cursoStyle,
    }
  ]
}

export async function loader() {
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCurso(),
  ]);
  
  return {
    guitarras: guitarras?.data,
    posts: posts?.data,
    curso: curso?.data?.attributes,
  };
}

function Index() {
  const {guitarras, posts, curso} = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <h2 className="heading">nuestra colección</h2>
        <ListadoGuitarras 
          guitarras={guitarras}
        />
      </main>
      <Curso 
        curso={curso}
      />
      <section className="contenedor">
        <ListadoPosts 
          posts={posts}
        />
      </section>
    </>
  );
}

export default Index;