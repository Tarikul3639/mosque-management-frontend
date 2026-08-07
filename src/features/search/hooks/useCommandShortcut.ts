"use client"

import { useEffect } from "react"

interface UseCommandShortcutOptions {
  onOpen: () => void
  onClose?: () => void
}

export function useCommandShortcut({
  onOpen,
  onClose,
}: UseCommandShortcutOptions) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"

      if (isShortcut) {
        event.preventDefault()
        onOpen()
      }

      if (event.key === "Escape") {
        onClose?.()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onOpen, onClose])
}
