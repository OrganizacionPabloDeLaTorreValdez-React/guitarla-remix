import Post from "~/components/post";

function ListadoPosts(
{
  posts
}) {
  return (
    <>
      <div className="blog">
        {
          posts.length && posts.map(post => (
            <Post 
              key={post.id}
              post={post?.attributes}
            />
          ))
        }
      </div>
    </>
  );
}

export default ListadoPosts;