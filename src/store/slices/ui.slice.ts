import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FeatureDialogState = {
  open: boolean
  title: string
  description: string
}

type UiState = {
  featureDialog: FeatureDialogState
}

const initialState: UiState = {
  featureDialog: {
    open: false,
    title: "",
    description: "",
  },
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openFeatureDialog: (
      state,
      action: PayloadAction<{
        title: string
        description: string
      }>
    ) => {
      state.featureDialog.open = true
      state.featureDialog.title = action.payload.title
      state.featureDialog.description = action.payload.description
    },

    closeFeatureDialog: (state) => {
      state.featureDialog.open = false
      state.featureDialog.title = ""
      state.featureDialog.description = ""
    },
  },
})

export const { openFeatureDialog, closeFeatureDialog } = uiSlice.actions

export default uiSlice.reducer
