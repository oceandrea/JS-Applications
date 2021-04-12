import {html} from '../node_modules/lit-html/lit-html.js';
import {createArticle} from './requests/data.js';

const createPageTemplate = (onCreate) => html`
    <section id="create-page" class="content">
        <h1>Create Article</h1>

        <form @submit=${onCreate} id="create" action="#" method="">
            <fieldset>
                <p class="field title">
                    <label for="create-title">Title:</label>
                    <input type="text" id="create-title" name="title" placeholder="Enter article title">
                </p>

                <p class="field category">
                    <label for="create-category">Category:</label>
                    <input type="text" id="create-category" name="category" placeholder="Enter article category">
                </p>
                <p class="field">
                    <label for="create-content">Content:</label>
                    <textarea name="content" id="create-content"></textarea>
                </p>

                <p class="field submit">
                    <input class="btn submit" type="submit" value="Create">
                </p>

            </fieldset>
        </form>
    </section>
`

export async function displayCreate(context) {
    const section = createPageTemplate(onCreate);
    context.render(section);

    async function onCreate(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        if (!title || !category || !content) {
            return alert('All fields are mandatory!');
        }

        await createArticle({title, category, content});
        context.redirect('/');
    }
}