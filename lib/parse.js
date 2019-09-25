const parseDisqusXML = (content, w = window) => {
    const myParser = new w.DOMParser();
    const parsed = myParser.parseFromString(content, 'text/xml');
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
        };
    }
    return pmIndex;
};

export default parseDisqusXML;
