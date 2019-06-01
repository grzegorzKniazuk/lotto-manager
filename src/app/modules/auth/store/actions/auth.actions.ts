import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
    LOGIN = '[Auth] Login',
    LOGOUT = '[Auth] Logout',
}

export class LOGIN implements Action {
    public readonly type = AuthActionsTypes.LOGIN;

    constructor(public payload: { username: string, token: string }) {
    }
}

export class LOGOUT implements Action {
    public readonly type = AuthActionsTypes.LOGOUT;
}

export type AuthActions = LOGIN | LOGOUT;
