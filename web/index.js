import JSZip from 'jszip';
import parseDisqusXML from '../lib/parse';
import './scss/index.scss';

const handler = (content) => {
    const result = new JSZip();
    const parsed = parseDisqusXML(content);
    const threadKeys = Object.keys(parsed);
    const threadList = [];
    threadKeys.forEach((f) => {
        const e = parsed[f];
        const newURL = encodeURIComponent(e.url)
        /*
            .replace(/</g, '%3C')
            .replace(/>/g, '%3E')
            .replace(/:/g, '%3A')
            .replace(/"/g, '%22')
            .replace(/\//g, '%2F')
            .replace(/\\/g, '%5C')
            .replace(/\|/g, '%7C')
            .replace(/\?/g, '%3F')
        */
            .replace(/\*/g, '%2A');
        result.file(`threads/${newURL}.json`, JSON.stringify(e.posts, null, 4));
        delete e.posts;
        threadList.push(e);
    });
    result.file('index.json', JSON.stringify(threadList, null, 4));
    result.generateAsync({
        type: 'blob',
    }).then((data) => {
        const filename = `pomment-${new Date().getTime()}.zip`;
        const eleLink = document.createElement('a');
        eleLink.download = filename;
        eleLink.style.display = 'none';
        eleLink.href = URL.createObjectURL(data);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
    });
};

const file = document.getElementById('content');
file.addEventListener('change', () => {
    const fileInfo = file.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        handler(e.target.result);
    };
    fileReader.readAsText(fileInfo, 'utf-8');
});
