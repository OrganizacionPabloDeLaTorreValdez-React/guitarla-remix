import styles from "~/styles/blog.css";
import { Outlet } from "@remix-run/react";

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    }
  ]
}

function Blog() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default Blog;