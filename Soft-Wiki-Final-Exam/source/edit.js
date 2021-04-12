import {html} from '../node_modules/lit-html/lit-html.js';
import {editArticle, getSingleArticle} from "./requests/data.js";

const editTemplate = (article, onEdit) => html`
    <section id="edit-page" class="content">
        <h1>Edit Article</h1>

        <form @submit=${onEdit} id="edit" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="title">Title:</label>
                    <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
                </p>

                <p class="field category">
                    <label for="category">Category:</label>
                    <input type="text" name="category" id="category" placeholder="Enter article category" .value=${article.category}>
                </p>
                <p class="field">
                    <label for="content">Content:</label>
                    <textarea name="content" id="content" .value=${article.content}></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Save Changes">
                </p>

            </fieldset>
        </form>
    </section>
`

export async function displayEdit(context) {
    const id = context.params.id;
    const data = await getSingleArticle(id);
    const section = editTemplate(data, onEdit);
    context.render(section);

    async function onEdit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        if (!title || !category || !content) {
            return alert('All fields are mandatory!');
        }

        await editArticle({title, category, content}, id);
        context.redirect(`/details/${id}`);
    }
}