import AvatarsStorage from "./avatarsStorage.js";

export default class UserStorage {
    static setDefaultIfEmpty(key, defaultValue) {
        const value = localStorage.getItem(key);
        if (!value) {
            localStorage.setItem(key, defaultValue);
        }
        return value || defaultValue;
    }


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
        return this.setDefaultIfEmpty('selectedCategory', 'category-algebra');
    }

    static set selectedCategory(value) {
        localStorage.setItem('selectedCategory', value);
    }


    static get username() {
        return this.setDefaultIfEmpty('username', 'Гость');
    }

    static set username(value) {
        localStorage.setItem('username', value);
    }


    static get gems() {
        return Number(localStorage.getItem('gems')) || 0;
    }

    static set gems(value) {
        localStorage.setItem('gems', value);
    }


    static get solvedTasks() {
        return JSON.parse(this.setDefaultIfEmpty('solved', '[]'));
    }

    static addSolvedTask(id, category) {
        const solved = this.solvedTasks;
        const task = { id: id, category: category };
        if (this.isTaskSolved(id, category)) {
            return false;
        }
        solved.push(task);
        localStorage.setItem('solved', JSON.stringify(solved));
        return true;
    }

    static isTaskSolved(id, category) {
        const solved = this.solvedTasks;
        const task = { id: id, category: category };
        return solved.some(t => t.id == task.id && t.category == task.category);
    }


    static get avatars() {
        return JSON.parse(this.setDefaultIfEmpty('avatars', '["grape"]'));
    }

    static async purchaseAvatar(id) {
        const avatars = await AvatarsStorage.getAvatars();
        const userAvatars = this.avatars;
        for (const avatar of avatars) {
            if (avatar.id == id) {
                if (this.gems > avatar.price) {
                    this.gems -= avatar.price;
                    userAvatars.push(id);
                    localStorage.setItem('avatars', JSON.stringify(userAvatars));
                } else {
                    throw new Error('Not enough gems');
                }
                return;
            }
        }
        throw new Error('Incorrect id');
    }


    static get avatar() {
        return this.setDefaultIfEmpty('avatar', 'grape');
    }

    static set avatar(id) {
        localStorage.setItem('avatar', id);
    }
}