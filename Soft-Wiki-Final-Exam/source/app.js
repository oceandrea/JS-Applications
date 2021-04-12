import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {displayLogin} from "./login.js";
import {logoutRequest} from "./requests/data.js";
import {displayRegister} from "./register.js";
import {displayHome} from "./homepage.js";
import {displayCatalogue} from "./catalogue.js";
import {displayCreate} from "./create.js";
import {displayDetails} from "./details.js";
import {displayEdit} from "./edit.js";
import {displaySearch} from "./search.js";

const main = document.getElementById('main-content');
const userView = document.getElementById('user');
const guestView = document.getElementById('guest');
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', async () => {
    await logoutRequest();
    navigationSetup();
    page.redirect('/');
})

page('/', contextSetup, displayHome)
page('/login', contextSetup, displayLogin);
page('/register', contextSetup, displayRegister);
page('/catalogue', contextSetup, displayCatalogue);
page('/create', contextSetup, displayCreate);
page('/details/:id', contextSetup, displayDetails);
page('/edit/:id', contextSetup, displayEdit);
page('/search', contextSetup, displaySearch);
page.start();

navigationSetup();

function contextSetup(context, next) {
    context.render = (section) => render(section, main);
    context.navigationSetup = navigationSetup;
    context.redirect = (where) => page.redirect(where);
    next();
}

function navigationSetup() {
    if (sessionStorage.getItem('authToken')) {
        userView.style.display = 'block';
        guestView.style.display = 'none';
    } else {
        userView.style.display = 'none';
        guestView.style.display = 'block';
    }
}