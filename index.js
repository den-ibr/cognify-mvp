import Streak from './streak.js';
import TaskStorage from './tasks/taskStorage.js';
import CategoryButton from './components/categoryButton.js';

const streak = new Streak();

await TaskStorage.ready();
const categories = TaskStorage.categories;

const categoryPicker = document.getElementById('category-picker');
categories.forEach(category => {categoryPicker.appendChild(CategoryButton.create(category.name, category.folderName))});
