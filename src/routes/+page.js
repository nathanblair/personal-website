export const ssr = false
export const prerender = true

import { name } from "$lib/constants.js"

export function load() {
  return {
    title: `Home`,
    description: name
  }
}
