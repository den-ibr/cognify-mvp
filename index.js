import TaskStorage from './tasks/taskStorage.js';
import CategoryButton from './components/categoryButton.js';
import TaskList from './components/taskList.js';
import User from './user.js';

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get('id');

await TaskStorage.ready();
const categories = TaskStorage.categories;

const categoryPicker = document.getElementById('category-picker');
categories.forEach(category => {categoryPicker.appendChild(CategoryButton.create(category.name, category.folderName))});

User.renderProfile();

TaskList.render();