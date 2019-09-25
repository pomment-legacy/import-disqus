const parseDisqusXML = (content, w = window) => {
    const myParser = new w.DOMParser();
    const parsed = myParser.parseFromString(content, 'text/xml');
    console.log(parsed);
};

export default parseDisqusXML;
