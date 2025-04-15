export default class StatsRow {
    static create(title, color, solved, total, id) {
        const container = document.createElement('div');
        container.classList.add('stats-row-container');

        const header = this._createHeader(title, solved, total, id);
        const bar = this._createBar(color, solved, total, id);

        container.appendChild(header);
        container.appendChild(bar);
        return container;
    }

    static _createHeader(title, solved, total, id) {
        const header = document.createElement('div');
        header.classList.add('two-value-table-row');
        header.classList.add('inter-regular');

        const rowTitle = document.createElement('p');
        rowTitle.innerText = title;

        const counter = document.createElement('p');
        counter.innerText = `${solved} из ${total}`;
        counter.classList.add('grey');
        counter.id = `counter${id}`

        header.appendChild(rowTitle);
        header.appendChild(counter);
        return header;
    }

    static _createBar(color, solved, total, id) {
        if (!['blue', 'green', 'yellow', 'red'].includes(color)) {
            throw new Error('Incorrect color');
        }

        const barBg = document.createElement('div');
        barBg.classList.add('stats-bar-bg');

        const bar = document.createElement('div');
        bar.classList.add('stats-bar');
        bar.classList.add(`stats-${color}`);
        bar.style.width = `${this._countWidthPercents(solved, total)}%`;
        bar.id = `bar${id}`;

        barBg.appendChild(bar);
        return barBg;
    }

    static _countWidthPercents(solved, total) {
        const newTotal = total === 0 ? 1 : total;
        return 100 * solved / newTotal;
    }

    static update(id, solved, total) {
        const bar = document.getElementById(`bar${id}`);
        bar.style.width = `${this._countWidthPercents(solved, total)}%`;

        const counter = document.getElementById(`counter${id}`);
        counter.innerText = `${solved} из ${total}`;
    }
}