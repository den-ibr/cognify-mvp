import UserStorage from './userStorage.js';
import Streak from './streak.js';
import StatsView from './components/statsView.js';
import Store from './store.js';

document.getElementById('edit-username').addEventListener('click', () => {
    const newName = prompt('Введите новое имя пользователя');
    if (newName && newName.length > 3 && newName.length < 16) {
        User.name = newName;
    } else {
        alert('Имя пользователя должно быть от 3 до 15 символов');
    }
});

export default class User {
    static streak = new Streak();

    static get gems() {
        return UserStorage.gems;
    }

    static set gems(value) {
        UserStorage.gems = value;
    }

    static get name() {
        return UserStorage.username;
    }

    static set name(value) {
        UserStorage.username = value;
        this.renderProfile();
    }

    static async renderProfile() {
        document.getElementById('username').innerText = this.name;
        document.getElementById('gems').innerText = this.gems;
        await StatsView.render();
        await Store.render(this.renderProfile.bind(this));
        this.renderAvatar();
    }

    static renderAvatar() {
        const avatar = document.getElementById('profile-pic');
        const id = UserStorage.avatar;
        avatar.src = `assets/fluent-emoji/${id}.png`;
    }
}
