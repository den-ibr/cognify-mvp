const categoriesPromise = fetch('tasks/categories.json').then(response => response.json());

export default class TaskStorage {
    static categories = null;

    static async ready() {
        this.categories = await categoriesPromise;
    }

    static get categories() {
        return this.categories;
    }
}