import parseDisqusXML from '../lib/parse';
import './scss/index.scss';

const file = document.getElementById('content');
file.addEventListener('change', () => {
    const fileInfo = file.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
        console.log(parseDisqusXML(e.target.result));
    };
    fileReader.readAsText(fileInfo, 'utf-8');
});
