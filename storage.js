export default class Storage {
    static get streak() {
        return Number(localStorage.getItem('streak')) || 0;
    }

    static set streak(value) {
        localStorage.setItem('streak', value);
    }

    static get lastDate() {
        return localStorage.getItem('lastDate');
    }

    static set lastDate(value) {
        localStorage.setItem('lastDate', value);
    }
}