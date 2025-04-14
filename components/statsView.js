import Stats from '../stats.js';
import StatsRow from './statsRow.js';

export default class StatsView {  // тут код тоже конечно написан в стиле YandereDev
    static isSetUp = false;

    static async render() {
        if (!this.isSetUp) {
            await this._create();
            return;
        }
        this._update();
    }

    static async _create() {
        await Stats.loadStatsForCategory();
        const profile = document.getElementById('user-profile');

        profile.appendChild(
            StatsRow.create(
                'Всего решено',
                'blue',
                Stats.total[0],
                Stats.total[1],
                0
            )
        );

        profile.appendChild(
            StatsRow.create(
                'Решено простых',
                'green',
                Stats.easy[0],
                Stats.easy[1],
                1
            )
        );

        profile.appendChild(
            StatsRow.create(
                'Решено средних',
                'yellow',
                Stats.medium[0],
                Stats.medium[1],
                2
            )
        );

        profile.appendChild(
            StatsRow.create(
                'Решено сложных',
                'red',
                Stats.hard[0],
                Stats.hard[1],
                3
            )
        );

        this.isSetUp = true;
    }

    static async _update() {
        await Stats.loadStatsForCategory();
        const profile = document.getElementById('user-profile');

        StatsRow.update(0, Stats.total[0], Stats.total[1]);
        StatsRow.update(1, Stats.easy[0], Stats.easy[1]);
        StatsRow.update(2, Stats.medium[0], Stats.medium[1]);
        StatsRow.update(3, Stats.hard[0], Stats.hard[1]);
    }
}
