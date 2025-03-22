import Storage from "../storage.js";

export default class CategoryButton {
    static create(name, folderName) {
        const selectedCategory = Storage.selectedCategory;
        const button = document.createElement('button');
        const categoryId = `category-${folderName}`;
        button.classList.add('category-button');
        if (categoryId === selectedCategory) {
            button.classList.add('selected');
        }
        button.classList.add('inter-medium');
        button.innerText = name;
        button.id = categoryId;
        this._addListener(button);
        return button;
    }

    static _addListener(button) {
        const id = button.id;
        button.addEventListener('click', () => {
            Storage.selectedCategory = id;
            const buttons = document.getElementsByClassName('category-button');
            for (const button of buttons) {
                button.classList.remove('selected');
            }
            document.getElementById(id).classList.add('selected');
        });
    }
}
