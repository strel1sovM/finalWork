import { ErrorToast, SuccessToast } from "../components/ToastComponent";
import { renderToast } from "./render";

export function useToast(type, message) {
    if (type === 'error') {
        renderToast(document.body, ErrorToast, message);
    } else {
        renderToast(document.body, SuccessToast, message);
    }
}
