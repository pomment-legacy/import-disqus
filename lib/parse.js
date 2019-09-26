const toText = (html, w = window) => {
    const myParser = new w.DOMParser();
    const parsed = myParser.parseFromString(html, 'text/html');
    const links = parsed.body.querySelectorAll('a');
    links.forEach((e) => {
        e.textContent = ` ${e.textContent.trim()} [${e.href}] `;
    });
    const tempContainer = document.createElement('div');
    while (parsed.body.childNodes.length > 0) {
        tempContainer.appendChild(parsed.body.childNodes[0]);
    }
    w.document.body.appendChild(tempContainer);
    const rendered = tempContainer.innerText;
    tempContainer.remove();
    return rendered;
};

const parseDisqusXML = (raw, w = window) => {
    const myParser = new w.DOMParser();
    const parsed = myParser.parseFromString(raw, 'text/xml');
    const threads = parsed.querySelectorAll(':scope > thread');
    const posts = parsed.querySelectorAll(':scope > post');
    const pmIndex = {};
    for (let i = 0; i < threads.length; i += 1) {
        const e = threads[i];
        const url = e.querySelector('link').textContent;
        const title = e.querySelector('title').textContent;
        pmIndex[e.attributes['dsq:id'].value] = {
            url,
            attributes: {
                title,
            },
            posts: [],
        };
    }
    posts.forEach((e) => {
        const id = e.attributes['dsq:id'].value;
        const name = e.querySelector(':scope > author > name').textContent.trim();
        const parent = e.querySelector(':scope > parent') === null ? -1 : e.querySelector(':scope > parent').attributes['dsq:id'].value;
        const content = toText(e.querySelector(':scope > message').textContent, w);
        console.log(content);
        const hidden = e.querySelector(':scope > isDeleted') === 'true';
        const createdAt = new Date(e.querySelector(':scope > createdAt').textContent).getTime();
        const forThread = e.querySelector(':scope > thread').attributes['dsq:id'].value;
        const hasUsername = e.querySelector(':scope > author > username') !== null;
        const item = {
            id,
            name,
            email: null,
            website: null,
            avatar: hasUsername ? `https://disqus.com/api/users/avatars/${e.querySelector(':scope > author > username').textContent}.jpg` : null,
            parent,
            content,
            hidden,
            byAdmin: false,
            receiveEmail: true,
            editKey: null,
            createdAt,
            updatedAt: createdAt,
            origContent: content,
        };
        pmIndex[forThread].posts.push(item);
    });
    const pmKeys = Object.keys(pmIndex);
    pmKeys.forEach((e) => {
        if (pmIndex[e].posts.length < 1) {
            delete pmIndex[e];
        }
    });
    return pmIndex;
};

export default parseDisqusXML;
