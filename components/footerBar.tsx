import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { Home, Menu2, PlaylistAdd, Search, Ticket, User, UserCircle } from 'tabler-icons-react';
import { useScrollLock } from '@mantine/hooks';
import UserContext from '../contexts/user';
import { ClipboardList } from 'tabler-icons-react';

const FooterBar = ({
}: {
}) => {
    const lastScrollTop = useRef<number>(0);
    const [size, setSize] = useState('h-[52px]');
    const [activeTab, setActiveTab] = useState('home');
    const [accountOverlayVisible, setAccountOverlayVisible] =
        useState<boolean>(false);
    const [, setScrollLocked] = useScrollLock();
    const router = useRouter();
    const { decodedToken } = useContext(UserContext);

    const handleScroll = () => {
        const st = window.scrollY || document.documentElement.scrollTop;
        if (st > lastScrollTop?.current) {
            if (window.innerHeight + st >= document.body.scrollHeight) {
                setSize('h-[52px]'); // up
            } else {
                console.log('down')
                setSize('h-[0]'); // down
            }
        } else {
            setSize('h-[52px]'); // up
        }
        lastScrollTop.current = st <= 0 ? 0 : st;
    };
    const handleResize = () => {
        setSize('h-0');
    };

    const handleRedirect = (path: string) => {
        setAccountOverlayVisible(false);
        //Erro ta nesse if
        if (router.asPath.indexOf('?') >= 0) {
            if (
                router.asPath.slice(0, router.asPath.indexOf('?')) !==
                path.slice(0, router.asPath.indexOf('?'))
            ) {
                router.push(path);
            }
        } else if (router.asPath !== path) {
            router.push(path);
        }
    };

    useEffect(() => {
        setScrollLocked(accountOverlayVisible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accountOverlayVisible]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, false);
        window.visualViewport.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (router.isReady) {
            if (router.asPath === '/') {
                setActiveTab('home');
            } else {
                if (
                    router.asPath.includes('?')
                        ? router.asPath
                            .slice(0, router.asPath.indexOf('?'))
                            .includes('user/')
                        : router.asPath.includes('user/')
                ) {
                    setActiveTab(router.asPath.split('/')[2]);
                } else if (
                    router.asPath.includes('?')
                        ? router.asPath
                            .slice(0, router.asPath.indexOf('?'))
                            .includes('/user')
                        : router.asPath.includes('/user')
                ) {
                    setActiveTab('account');
                }
            }
        }
    }, [router]);

    const search = () => {
        const input = document.getElementById('search');
        input?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
        setTimeout(() => {
            input?.focus();
        }, 560);
    };

    return (
        <div
            className={`fixed bottom-0 px-6 drop-shadow-lg bg-white flex align-middle justify-between z-[200] left-0 w-full h-[100px] transition-all duration-300 xl:hidden ${size} print:hidden`}
        >
            <div className="my-auto text-center">
                <ClipboardList
                    size={30}
                    strokeWidth={2}
                    color={'black'}
                    className="mx-auto"
                    onClick={() => handleRedirect('/')}
                />
                <label
                    className={`text-[10px] ${activeTab === 'home' ? 'text-primary' : 'text-gray'
                        }`}
                >
                    Reservas
                </label>
            </div>
            <div className="my-auto text-center" onClick={search}>
                <PlaylistAdd
                    size={48}
                    strokeWidth={2}
                    className="mx-auto"

                    color={'black'}
                />
            </div>
            <div
                className="my-auto text-center"
                onClick={() => {
                    if (decodedToken) {
                        setAccountOverlayVisible(!accountOverlayVisible);
                    } else {
                        handleRedirect('/user');
                    }
                }}
            >
                {!decodedToken ? (
                    <div>
                        <UserCircle
                            size={30}
                            color={`${activeTab === 'account' ? '#FFD354' : 'black'}`}
                            className="mx-auto"
                            strokeWidth={2}
                        />
                        <label
                            className={`text-[10px] ${activeTab === 'account' ? 'text-primary' : 'text-gray'
                                }`}
                        >
                            Conta
                        </label>
                    </div>
                ) : (
                    <div>
                        <Menu2 size={30} color="gray" className="mx-auto" />
                        <label className="text-[10px] text-gray">Menu</label>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FooterBar;