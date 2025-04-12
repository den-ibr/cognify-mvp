import TaskStorage from '../tasks/taskStorage.js';
import TaskButton from './taskButton.js';

export default class TaskList {
    static taskList = document.getElementById('task-list');

    static async render() {
        this.taskList.innerHTML = '';
        const tasks = await TaskStorage.getTasks();
        const category = TaskStorage.getCategory();
        tasks.forEach((task) => {
            this.taskList.appendChild(TaskButton.create(task, category));
        });
    }
}
