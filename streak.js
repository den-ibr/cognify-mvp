import UserStorage from './userStorage.js';

const currentDate = new Date().toISOString().split('T')[0];
const yesterdayDate = new Date();
yesterdayDate.setDate(yesterdayDate.getDate() - 1);

const yesterday = yesterdayDate.toISOString().split('T')[0];

export default class Streak {
    constructor() {
        this.streak = UserStorage.streak;
        this.lastDate = UserStorage.lastDate;
        this.streakElement = document.getElementById('streak');
        this.fireElement = document.getElementById('fire-icon');

        if (this.lastDate === currentDate) {
            this.makeOrange();
        }

        if (this.lastDate !== yesterday && this.lastDate !== currentDate) {
            this.streak = 0;
            UserStorage.streak = this.streak;
        }

        this.streakElement.innerText = this.streak;
    }

    makeOrange() {
        this.streakElement.classList.add('orange');
        this.fireElement.src = 'assets/fluent-emoji/fire.png';
    }

    incrementIfNeeded() {
        if (this.lastDate === currentDate) {
            return;
        }

        this.streak++;
        this.streakElement.innerText = this.streak;
        this.lastDate = currentDate;
        UserStorage.lastDate = this.lastDate;
        this.makeOrange();
        UserStorage.streak = this.streak;
    }
}
