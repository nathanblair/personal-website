
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const title = params.slug
  const description = ""

  return { title, description }
}
