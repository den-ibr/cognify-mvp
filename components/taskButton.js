import { TaskRewards as reward } from "../tasks/taskRewards.js";
import UserStorage from "../userStorage.js";

const complexity = {
    1: 'Простая',
    2: 'Средняя',
    3: 'Сложная',
};

const complexityColor = {
    1: 'green',
    2: 'text-yellow',
    3: 'red',
};

export default class TaskButton {
    static create(task, category) {
        const button = document.createElement('a');
        button.classList.add('task-button');
        button.id = `task${task.id}`;
        button.href = `./task?id=${task.id}&cat=${category}`;

        button.appendChild(this._createName(task, category));
        button.appendChild(this._createComplexity(task));
        button.appendChild(this._createReward(task));

        return button;
    }

    static _createName(task, category) {
        const taskName = document.createElement('div');
        taskName.classList.add('task-name');

        const icon = document.createElement('img');
        icon.src = 'assets/lucide-icons/circle.svg';
        icon.classList.add('icon20');

        const text = document.createElement('p');
        text.classList.add('inter-regular');
        text.innerText = `${task.id}. ${task.name}`;

        taskName.appendChild(icon);
        taskName.appendChild(text);

        if (UserStorage.isTaskSolved(task.id, category)) {
            text.classList.add('green');
            icon.src = 'assets/lucide-icons/circle-check-big.svg';
        }

        return taskName;
    }

    static _createComplexity(task) {
        const taskComplexity = document.createElement('div');
        taskComplexity.classList.add('task-complexity');

        const text = document.createElement('p');
        text.innerText = complexity[task.complexity];
        text.classList.add(complexityColor[task.complexity]);
        text.classList.add('inter-regular')
        taskComplexity.appendChild(text);

        return taskComplexity;
    }

    static _createReward(task) {
        const taskReward = document.createElement('div');
        taskReward.classList.add('task-cost');
        taskReward.appendChild(this._createGemIcon());

        const text = document.createElement('p');
        text.classList.add('inter-regular');
        text.classList.add('blue');
        text.innerText = reward[task.complexity];
        taskReward.appendChild(text);

        return taskReward;
    }

    static _createGemIcon() {
        const gemIcon = document.createElement('img');
        gemIcon.classList.add('icon20');
        gemIcon.src = 'assets/fluent-emoji/gem.png';
        return gemIcon;
    }
}
