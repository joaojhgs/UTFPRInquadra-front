import React from 'react';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    documentNumber?: string;
    phoneNumber?: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

export interface IToken {
    id: string;
    ra: number,
    role: "User" | "ADMIN",
    iat: number | string;
    exp: number | string;
}

interface IUserProvider {
    decodedToken?: IToken | undefined | null;
    setDecodedToken: (t: IToken | undefined | null) => void | undefined;
}

const UserContext = React.createContext<IUserProvider>({
    setDecodedToken: () => {
        return;
    },
});

export default UserContext;