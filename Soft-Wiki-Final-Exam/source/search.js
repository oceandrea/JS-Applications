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
    const section = searchTemplate(onSearch);
    context.render(section);

    async function onSearch(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const searchQuery = data.get('search');

        if (!searchQuery) {
            return alert('Field is mandatory!');
        }

        const result = await search(searchQuery);
        displayResult(result)
    }

    function displayResult(result) {
        const sectionWithResult = searchTemplate(onSearch, result);
        context.render(sectionWithResult);
    }
}