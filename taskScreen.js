import TaskStorage from './tasks/taskStorage.js';
import User from './user.js';

await TaskStorage.ready();
await User.renderProfile();

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const category = urlParams.get('cat');

const task = await TaskStorage.getTask(id, category);
task.render();
