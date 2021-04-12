import {html} from '../node_modules/lit-html/lit-html.js';
import {getSingleArticle, deleteArticle} from "./requests/data.js";


const detailsTemplate = (article, isOwner, onDelete) => html`
    <section id="details-page" class="content details">
        <h1>${article.title}</h1>

        <div class="details-content">
            <strong>Published in category ${article.category}</strong>
            <p>${article.content}</p>

            <div class="buttons">
            ${isOwner ? html`
                    <a @click=${onDelete} href="javascript:void(0)" class="btn delete">Delete</a>
                    <a href="/edit/${article._id}" class="btn edit">Edit</a>` : ''}
                <a href="/" class="btn edit">Back</a>
            </div>
        </div>
    </section>
`

export async function displayDetails(context) {
    const id = context.params.id;
    const data = await getSingleArticle(id);
    const isOwner = sessionStorage.getItem('userId') === data._ownerId;
    const section = detailsTemplate(data, isOwner, onDelete);
    context.render(section);

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteArticle(id);
            context.redirect('/');
        }
    }
}