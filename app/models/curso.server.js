export async function getCurso() {
  return fetch(`${process.env.API_URL}/curso?populate=imagen`)
    .then(res => res.ok ? res.json() : Promise.reject("error"))
    .catch(err => {});
}