import type { SearchResult } from "@/types/search"

export function groupResults(results: SearchResult[]) {
  return results.reduce<Record<string, SearchResult[]>>((groups, result) => {
    if (!groups[result.type]) {
      groups[result.type] = []
    }

    groups[result.type].push(result)

    return groups
  }, {})
}
