export const prerender = true

import { name } from "$lib/constants.js"

export function load() {
  return {
    title: `Resumé`,
    description: `${name}'s Curriculum Vitae`
  }
}
