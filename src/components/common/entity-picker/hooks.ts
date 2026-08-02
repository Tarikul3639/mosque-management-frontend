// src/components/common/entity-picker/hooks.ts

"use client"

import { useCallback, useMemo, useState } from "react"

export function useEntityPicker() {
  const [open, setOpen] = useState(false)

  const [search, setSearch] = useState("")

  const openPicker = useCallback(() => {
    setOpen(true)
  }, [])

  const closePicker = useCallback(() => {
    setOpen(false)
  }, [])

  const resetSearch = useCallback(() => {
    setSearch("")
  }, [])

  const onOpenChange = useCallback((value: boolean) => {
    setOpen(value)

    if (!value) {
      setSearch("")
    }
  }, [])

  return useMemo(
    () => ({
      open,
      search,

      setSearch,

      openPicker,
      closePicker,
      resetSearch,
      onOpenChange,
    }),
    [open, search, openPicker, closePicker, resetSearch, onOpenChange]
  )
}
