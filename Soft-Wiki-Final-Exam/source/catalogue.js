import {html} from '../node_modules/lit-html/lit-html.js';
import {getAllArticles} from './requests/data.js'

const allArticlesTemplate = (articles) => html`
    <section id="catalog-page" class="content catalogue">
        <h1>All Articles</h1>
        ${articles.length !== 0 ? articles.map(articleTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
`

export const articleTemplate = (article) => html`
    <a class="article-preview" href="/details/${article._id}">
        <article>
            <h3>Topic: <span>${article.title}</span></h3>
            <p>Category: <span>${article.category}</span></p>
        </article>
    </a>
`

export async function displayCatalogue(context) {
    const data = await getAllArticles();
    const section = allArticlesTemplate(data);
    context.render(section);
}