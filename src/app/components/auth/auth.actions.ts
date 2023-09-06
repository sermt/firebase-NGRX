import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUser = createAction('[Auth Component] setUser', props<{user: User}>());
export const unsetUser = createAction('[Auth Component] unsetUer');



