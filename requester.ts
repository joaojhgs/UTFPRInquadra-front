import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const instance = axios.create({ baseURL });

instance.interceptors.request.use(request => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            ((request ?? {}).headers ?? {})[
                'Authorization'
            ] = `Bearer ${token.replace('"', '')}`;
        }
    }
    ((request ?? {}).headers ?? {})['Access-Control-Request-Header'] =
        'Authorization';
    ((request ?? {}).headers ?? {})['x-origin-request'] = 'website';

    return request;
});

export default instance;