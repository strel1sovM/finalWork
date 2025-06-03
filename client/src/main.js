import './assets/default.css';
import './assets/app.css';
import { handleLinkClick, router } from "./router/router.js";

window.addEventListener('popstate', router);
document.addEventListener('click', handleLinkClick);

router();
