// What the room shows is picked in dataService.ts via `featured: true`.
export function pickFeatured<T extends { featured?: boolean }>(
  items: T[],
  max: number
): T[] {
  return items.filter((i) => i.featured).slice(0, max)
}

export function currentEmployer(
  groups: { place: string; items: { subtitle: string }[] }[]
): string | null {
  return (
    groups.find((g) => g.items.some((i) => i.subtitle.includes('Present')))
      ?.place ?? null
  )
}
