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
    for (let i = 0; i < posts.length; i += 1) {
        const e = posts[i];
        const id = e.attributes['dsq:id'].value;
        const name = e.querySelector(':scope > author > name').textContent;
        const parent = e.querySelector(':scope > parent') === null ? -1 : e.querySelector(':scope > parent').attributes['dsq:id'].value;
        const content = e.querySelector(':scope > message').textContent;
        const hidden = e.querySelector(':scope > isDeleted') === 'true';
        const createdAt = new Date(e.querySelector(':scope > createdAt').textContent).getTime();
        const forThread = e.querySelector(':scope > thread').attributes['dsq:id'].value;
        const item = {
            id,
            name,
            email: null,
            website: null,
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
    }
    return pmIndex;
};

export default parseDisqusXML;
