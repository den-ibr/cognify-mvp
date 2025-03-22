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

    static get selectedCategory() {
        const category = localStorage.getItem('selectedCategory');
        if (!category) {
            this.selectedCategory = 'category-algebra';
        }
        return category || 'category-algebra';
    }

    static set selectedCategory(value) {
        localStorage.setItem('selectedCategory', value);
    }
}