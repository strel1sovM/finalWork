import { cookie } from './cookie';
import axios from 'axios';
import { parseJwt } from './parseJWT';


export async function useUser() {
    const token = cookie.getCookie('accessToken') || "";
    
    if (token === 'undefined' || !token) {
        return;
    }

    const payload = parseJwt(token);

    try {
        const res = await axios.get(import.meta.env.VITE_API_URL + '/users/' + payload.sub, {
            headers: {
             Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (e) {
        cookie.setCookie('accessToken', '');
    }
}