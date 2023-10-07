export async function getGuitarras() {
  return fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
    .then(res => res.ok ? res.json() : Promise.reject('error'))
    .catch(err => {});
}

export async function getGuitarra(url) {
  return fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    .then(res => res.ok ? res.json() : Promise.reject('error'))
    .catch(err => {});
}