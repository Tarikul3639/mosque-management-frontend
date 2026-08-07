// utils/get-dirty-values.ts
import type { FieldValues } from "react-hook-form"

export function getDirtyValues<T extends FieldValues>(
  dirtyFields: Partial<Record<keyof T, unknown>>,
  values: T
): Partial<T> {
  return Object.keys(dirtyFields).reduce((acc, key) => {
    const typedKey = key as keyof T
    acc[typedKey] = values[typedKey]
    return acc
  }, {} as Partial<T>)
}
