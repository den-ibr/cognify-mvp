import AvatarsStorage from "./avatarsStorage.js";
import StoreRow from "./components/storeRow.js";
import UserStorage from "./userStorage.js";

export default class Store {
    static async render(reloadFunc) {
        document.getElementById('store-container').innerHTML = '<p class="inter-medium header-text">Иконка профиля</p>';
        
        const avatars = await AvatarsStorage.getAvatars();
        const userAvatars = UserStorage.avatars;
        const selected = UserStorage.avatar;
        const container = document.getElementById('store-container');

        StoreRow.reloadFunc ??= reloadFunc;
        console.log(StoreRow.reloadFunc);

        for (const avatar of avatars) {
            const row = await StoreRow.create(avatar.id, avatar.name, avatar.price, avatar.id == selected, userAvatars.includes(avatar.id));
            container.appendChild(row);
        }
    }
}