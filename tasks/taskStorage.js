import UserStorage from '../userStorage.js';
import Task from '../task.js';

const categoriesPromise = fetch('tasks/categories.json').then((response) =>
    response.json()
);

export default class TaskStorage {
    static categories = null;

    static async ready() {
        this.categories = await categoriesPromise;
    }

    static async getTasks() {
        const category = UserStorage.selectedCategory.slice(9);
        const folder = `tasks/${category}`;
        const tasks = await fetch(`${folder}/tasks.json`).then((response) =>
            response.json()
        );
        return tasks;
    }

    static getCategory() {
        return UserStorage.selectedCategory.slice(9);
    }

    static async getTask(taskId, category) {
        const folder = `tasks/${category}`;
        const tasks = await fetch(`${folder}/tasks.json`).then((response) =>
            response.json()
        );
        let taskData = tasks.find((task) => task.id == taskId);
        const rawContent = await this._getRawTask(taskId, category);
        let parts = rawContent.split('\n---\n');
        if (parts.length === 1) {
            parts = rawContent.split('\r\n---\r\n');
        }
        return new Task(
            category,
            taskId,
            taskData.name,
            taskData.complexity,
            taskData.answer,
            taskData.source,
            parts
        );
    }

    static async _getRawTask(taskId, category) {
        const folder = `tasks/${category}`;
        const task = await fetch(`${folder}/${taskId}.md`).then((response) =>
            response.text()
        );
        return task;
    }
}
