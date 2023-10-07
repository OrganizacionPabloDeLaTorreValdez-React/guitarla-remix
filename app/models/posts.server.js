export async function getPosts() {
  return fetch(`${process.env.API_URL}/posts?populate=imagen`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {});
}

export async function getPost(url) {
    return fetch(`${process.env.API_URL}/posts?filters[url]=${url}&populate=imagen`)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .catch(err => {});
  }