import UserStorage from "../userStorage.js";

export default class StoreRow {
    static reloadFunc = null;

    static async create(id, name, price, chosen, purchased) {
        const row = document.createElement('div');
        row.classList.add('two-value-table-row');

        row.appendChild(this._createLeftContainer(id, name))
        row.appendChild(await this._createButton(price, chosen, purchased, id));

        return row;
    }

    static _createLeftContainer(id, name) {
        const container = document.createElement('div');
        container.classList.add('flex-container');

        const icon = document.createElement('img');
        icon.classList.add('icon32');
        icon.src = `assets/fluent-emoji/${id}.png`;

        const nameEl = document.createElement('p');
        nameEl.innerText = name;

        container.appendChild(icon);
        container.appendChild(nameEl);

        return container;
    }

    static async _createButton(price, chosen, purchased, id) {
        const button = document.createElement('button');
        button.classList.add('inter-medium');
        button.classList.add('store-button');
        if (chosen) {
            button.disabled = true;
            button.classList.add('green');
            button.innerText = 'Выбрано';
            return button;
        }
        button.classList.add('blue');
        if (purchased) {
            button.innerText = 'Выбрать';
            button.onclick = async function() {
                UserStorage.avatar = id;
                console.log(this.reloadFunc);
                await this.reloadFunc();
            }.bind(StoreRow);
            return button;
        }
        button.appendChild(this._createGemIcon());
        
        var priceEl = document.createElement('p');
        priceEl.innerText = price;
        button.appendChild(priceEl);
        button.disabled = price > UserStorage.gems;

        button.onclick = async function() {
            await UserStorage.purchaseAvatar(id);
            await this.reloadFunc();
        }.bind(StoreRow)

        return button;
    }

    static _createGemIcon() {
        const gemIcon = document.createElement('img');
        gemIcon.classList.add('icon20');
        gemIcon.src = 'assets/fluent-emoji/gem.png';
        return gemIcon;
    }
}