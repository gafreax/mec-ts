import { Dispatch, SetStateAction } from "react";

export type User = {
    username: string;
    password?: string;
    token?: string;
    logged: boolean;
    error?: string;
}

export type SetUser = Dispatch<SetStateAction<User>>

export type UserContext = {
    user?: User,
    setUser?: SetUser
}
