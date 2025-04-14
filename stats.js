import TaskStorage from "./tasks/taskStorage.js";
import UserStorage from "./userStorage.js";

export default class Stats {
    static total = [0, 0];  // [solved, total]
    static easy = [0, 0];
    static medium = [0, 0];
    static hard = [0, 0];

    static async loadStatsForCategory() {
        this._reset();
        const allTasks = await TaskStorage.getTasks();
        const solvedTasks = UserStorage.solvedTasks.filter(t => t.category == UserStorage.selectedCategory.slice(9));

        for (const task of allTasks) {
            const complexity = task.complexity;
            const solved = solvedTasks.some(t => t.id == task.id);
            this.total[1]++;
                if (solved) {
                    this.total[0]++;
                }
            switch (complexity) {  // вот бы это ещё переписать как-нибудь прилично
                case 1:
                    this.easy[1]++;
                    if (solved) {
                        this.easy[0]++;
                    }
                    break;
                case 2:
                    this.medium[1]++;
                    if (solved) {
                        this.medium[0]++;
                    }
                    break;
                case 3:
                    this.hard[1]++;
                    if (solved) {
                        this.hard[0]++;
                    }
                    break;
                default:
                    throw new Error('что');
            }
        }
    }

    static _reset() {
        this.total = [0, 0];
        this.easy = [0, 0];
        this.medium = [0, 0];
        this.hard = [0, 0];
    }
}