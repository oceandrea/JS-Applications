import {html} from '../node_modules/lit-html/lit-html.js';
import {articleTemplate} from "./catalogue.js";
import {search} from "./requests/data.js";

const searchTemplate = (onSearch, result=undefined) => html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form @submit=${onSearch} id="search-form">
            <p class="field search">
                <input type="text" placeholder="Search by article title" name="search">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Search">
            </p>
        </form>
        ${result ? html`
            <div class="search-container">
                ${result.length !== 0 ? result.map(articleTemplate) : html`<h3 class="no-articles">No matching articles</h3>`}
            </div>` : ''}
    </section>
`

export async function displaySearch(context) {
    let section;
    if (context.path === '/search') {
        section = searchTemplate(onSearch);
    } else {
        console.log(context)
        const searchQuery = context.querystring.split('=')[1];
        const data = searchQuery ? await search(searchQuery) : [];
        section = searchTemplate(onSearch, data);
    }
    context.render(section);

    function onSearch(event) {
        event.preventDefault();
        const searchField = document.getElementById('searchField');
        const query = searchField.value;

        if (!query) {
            return alert('Field is mandatory!');
        }
        const encodeQuery = encodeURIComponent(query);
        context.redirect('/search?query=' + encodeQuery);
    }
}