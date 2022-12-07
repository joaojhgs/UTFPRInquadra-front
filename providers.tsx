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

    useEffect(() => {
        if (decodedToken) {
            if (decodedToken.exp < Date.now() / 1000) {
                setDecodedToken(null);
                localStorage.removeItem('token');
                router.push(`/`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [decodedToken]);

    return (
        <ConfigProvider locale={{ locale: 'en' }}>
            <UserContext.Provider value={userProviderValue}>
                {children}
            </UserContext.Provider>
        </ConfigProvider>
    );
};

export default Providers;