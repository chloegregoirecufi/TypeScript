import { PayloadAction, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/ApiConstant";
import axios, { AxiosError } from "axios";
import { RootState } from "../store";

//on définit la structure d el'objet note
interface Note {
    title: string;
    description: string;
    user: string;
    createdAt: Date;
}

//on définit la structure d'hydra:member
interface HydraResponse<T>{
    'hydra:member': T[];
}

//on definit la structure de l'objet NoteState
interface NoteState {
    notes: Note[];
    loading: boolean;
}

//on initialise nos states
const initialState: NoteState = {notes: [], loading: false}

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers:{
        setNotes: (state, action:PayloadAction<HydraResponse<Note>>) => {
            state.notes = action.payload['hydra:member'];
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading  = action.payload;
        },
    }
});

export const {setNotes, setLoading} = noteSlice.actions;

export const fetchNotes = (): ThunkAction<void, RootState, unknown, NoteAction> => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get<HydraResponse<Note>>(`${API_URL}/notes?page=1`);
        dispatch(setNotes(response.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(`Erreur kirs de la récupération des notes: ${error as AxiosError}`);
        dispatch(setLoading(false));
    }
}

export default noteSlice.reducer;

//Types  personnalisés
interface SetNotesAction {
    type: typeof setNotes.type;
    payload: HydraResponse<Note>;
}

interface setLoadingAction {
    type: typeof setLoading.type;
    payload: boolean;
}

type NoteAction = SetNotesAction | setLoadingAction;