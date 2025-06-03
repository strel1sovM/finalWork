import { cookie } from "../utils/cookie"
import { redirect } from "../utils/helpers";

export default async () => {
    const acccessToken = cookie.getCookie('accessToken');

    if (acccessToken === 'undefined' || !acccessToken) {
        return redirect('/signin');
    }
}


