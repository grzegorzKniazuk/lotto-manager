import { AuthActions, AuthActionsTypes } from 'src/app/modules/auth/store/actions/auth.actions';

export interface AuthState {
    username: string;
    token: string;
}

export const initialAuthState: AuthState = {
    username: null,
    token: null,
};

export function authReducer(state = initialAuthState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionsTypes.LOGIN: {
            return {
                ...state,
                username: action.payload.username,
                token: action.payload.token,
            };
        }
        case AuthActionsTypes.LOGOUT: {
            return {
                ...state,
                username: null,
                token: null,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
