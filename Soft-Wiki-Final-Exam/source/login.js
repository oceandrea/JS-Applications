import {html} from '../node_modules/lit-html/lit-html.js';
import {loginRequest} from './requests/data.js';

const loginTemplate = (onLogin) => html`
    <section id="login-page" class="content auth">
        <h1>Login</h1>

        <form @submit=${onLogin} id="login" action="#" method="">
            <fieldset>
                <blockquote>Knowledge is like money: to be of value it must circulate, and in circulating it can
                    increase in quantity and, hopefully, in value</blockquote>
                <p class="field email">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="maria@email.com">
                </p>
                <p class="field password">
                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-pass" name="password">
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Log in">
                </p>
                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`

export async function displayLogin(context) {
    const section = loginTemplate(onLogin);
    context.render(section);

    async function onLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return alert('All fields are mandatory!');
        }

        await loginRequest({email, password});
        context.navigationSetup();
        context.redirect('/');
    }
}