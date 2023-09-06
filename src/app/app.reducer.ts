import { ActionReducerMap } from '@ngrx/store';
import * as ui from './components/shared/store/ui.reducer';


export interface AppState {
   ui:ui.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
}
