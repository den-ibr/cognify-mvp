import UserStorage from "./userStorage.js";
import User from "./user.js";
import { TaskRewards } from "./tasks/taskRewards.js";

export default class Task {
    constructor(category, id, name, complexity, answer, source, parts) {
        this.category = category;
        this.id = id;
        this.name = name;
        this.complexity = complexity;
        this.answer = answer;
        this.source = source;
        this.parts = parts;
        this.displayedParts = 0;
        
        this.hintButton = document.getElementById('hint-button');
        this.submitButton = document.getElementById('submit');
        this.input = document.getElementById('answer');
    }

    render() {
        document.getElementById('task-name').innerText = `${this.id}. ${this.name}`;
        document.getElementById('task-text').innerText = this.parts[0];
        this.displayedParts = 1;

        const container = document.getElementById('task-content');
        const footer = document.getElementById('task-content-footer');
        for (var i = 1; i < this.parts.length; i++) {
            const partContainer = document.createElement('div');
            partContainer.id = `part${i}`;
            partContainer.classList.add('secondary-task-part');

            const separator = document.createElement('hr');
            partContainer.appendChild(separator);

            const text = this.parts[i];
            const part = document.createElement('p');
            part.classList.add('inter-regular');
            part.innerText = text;
            partContainer.appendChild(part);

            container.insertBefore(partContainer, footer);
        }

        while (!(window.MathJax && MathJax.typesetPromise)) { }
        MathJax.typesetPromise();
        this.hintButton.onclick = this._displayNextPart.bind(this);

        this._renderHintButton();
        this._renderSubmitButton();

        if (UserStorage.isTaskSolved(this.id, this.category)) {
            this._displayAllParts();
        }
    }

    _displayNextPart() {
        if (this.displayedParts >= this.parts.length) return;
        document.getElementById(`part${this.displayedParts}`).style.display = 'flex';
        this.displayedParts++;
        this._renderHintButton();
        this._renderSubmitButton();
    }

    _displaySolution() {
        if (!confirm('Если вы откроете решение, вы не сможете получить награду за эту задачу. Открыть решение?')) {
            return;
        }
        this._displayNextPart();
        this.hintButton.style.display = 'none';
        UserStorage.addSolvedTask(this.id, this.category);
    }

    _renderHintButton() {
        if (this.displayedParts < this.parts.length) {
            this.hintButton.disabled = false;
        } else {
            this.hintButton.disabled = true;
        }
        if (this.displayedParts === this.parts.length - 1) {
            this.hintButton.innerText = 'Решение';
            this.hintButton.onclick = this._displaySolution.bind(this);
        }
    }

    _renderSubmitButton() {
        if (this.displayedParts === this.parts.length) {
            this._disableSubmit();
        }
        this.submitButton.onclick = this._submit.bind(this);
    }

    _disableSubmit() {
        this.submitButton.disabled = true;
        this.input.disabled = true;
    }

    _submit() {
        if (this.input.value == this.answer) {
            if (UserStorage.addSolvedTask(this.id, this.category)) {
                User.gems += TaskRewards[this.complexity];
                User.streak.incrementIfNeeded();
            }
            this.input.style.border = 'none';
            User.renderProfile();
            this._displayAllParts();
        } else {
            this.input.style.border = '2px solid #eb5757';
        }
    }

    _displayAllParts() {
        while (this.displayedParts < this.parts.length) {
            this._displayNextPart();
        }
        this.hintButton.style.display = 'none';
    }
}
