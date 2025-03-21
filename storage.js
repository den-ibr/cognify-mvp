export default class Storage {
    static get streak() {
        return Number(localStorage.getItem('streak')) || 0;
    }

    static set streak(value) {
        localStorage.setItem('streak', value);
    }
}