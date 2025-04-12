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

        MathJax.typesetPromise();
        this.hintButton.onclick = this._displayNextPart.bind(this);

        this._renderHintButton();
    }

    _displayNextPart() {
        if (this.displayedParts >= this.parts.length) return;
        document.getElementById(`part${this.displayedParts}`).style.display = 'flex';
        this.displayedParts++;
        this._renderHintButton();
    }

    _displaySolutioon() {
        if (!confirm('Если вы откроете решение, вы не сможете получить награду за эту задачу. Открыть решение?')) {
            return;
        }
        this._displayNextPart();
        this.hintButton.style.display = 'none';

    }

    _renderHintButton() {
        if (this.displayedParts < this.parts.length) {
            this.hintButton.disabled = false;
        } else {
            this.hintButton.disabled = true;
        }
        if (this.displayedParts == this.parts.length - 1) {
            this.hintButton.innerText = 'Решение';
            this.hintButton.onclick = this._displaySolutioon.bind(this);
        }
    }
}
