import React, { ReactElement, useEffect, useState } from 'react';
import UserContext, { IToken, IUser } from './contexts/user';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import { ConfigProvider } from 'antd';

const Providers = ({
    children,
}: {
    children: React.ReactNode;
}): ReactElement => {
    const [decodedToken, setDecodedToken] = useState<IToken | undefined | null>();
    const router = useRouter();
    const userProviderValue = {
        decodedToken,
        setDecodedToken,
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setDecodedToken(jwtDecode<IToken & JwtPayload>(token));
        } else {
            setDecodedToken(null);
        }
    }, []);

    return (
        <ConfigProvider locale={{ locale: 'pt' }}>
            <UserContext.Provider value={userProviderValue}>
                {children}
            </UserContext.Provider>
        </ConfigProvider>
    );
};

export default Providers;