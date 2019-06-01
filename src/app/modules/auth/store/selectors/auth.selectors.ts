import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/modules/auth/store/reducers/auth.reducer';
import { StoreFeatureNames } from 'src/app/shared/enums';

export const selectAuthState = createFeatureSelector<AuthState>(StoreFeatureNames.AUTH);

export const selectUsername = createSelector(
    selectAuthState,
    state => state.username,
);

export const selectAuthToken = createSelector(
    selectAuthState,
    state => state.token,
);
