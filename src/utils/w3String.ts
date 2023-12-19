
export default function shortAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`
}

export function slugToName(slug: string) {
  return `${slug[0].toUpperCase()}${slug.slice(1).replace(/-/g, ' ')}`
}