import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectNote = (state: RootState) => state.note.notes;
const selectLoading = (state: RootState) => state.note.loading;

export const selectNoteData = createSelector(
    [selectNote, selectLoading],
    (notes, loading) => ({notes, loading})
)
