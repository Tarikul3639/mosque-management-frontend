export interface EntityPickerOption {
  id: string
  title: string
  subtitle?: string
  description?: string
  avatar?: string | null
  badge?: string
}

export interface EntityPickerState {
  open: boolean
  search: string
}
