import {html} from '../node_modules/lit-html/lit-html.js';
import {getRecentArticles} from './requests/data.js'

const homePageTemplate = (jS, cSharp, java, python) => html`
    <section id="home-page" class="content">
        <h1>Recent Articles</h1>
        <section class="recent js">
            <h2>JavaScript</h2>
            ${jS ? articleTemplate(jS) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent csharp">
            <h2>C#</h2>
            ${cSharp ? articleTemplate(cSharp) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent java">
            <h2>Java</h2>
            ${java ? articleTemplate(java) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
        <section class="recent python">
            <h2>Python</h2>
            ${python ? articleTemplate(python) : html`<h3 class="no-articles">No articles yet</h3>`}
        </section>
    </section>
`

const articleTemplate = (data) => html`
    <article>
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <a href="/details/${data._id}" class="btn details-btn">Details</a>
    </article>
`

export async function displayHome(context) {
    const data = await getRecentArticles();
    const jS = data.find(a => a.category === 'JavaScript');
    const cSharp = data.find(a => a.category === 'C#');
    const java = data.find(a => a.category === 'Java');
    const python = data.find(a => a.category === 'Python');
    const section = homePageTemplate(jS, cSharp, java, python);
    context.render(section);
}