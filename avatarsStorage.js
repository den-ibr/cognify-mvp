export default class AvatarsStorage {
    static async getAvatars() {
        const avatars = await fetch(`store.json`).then((response) =>
            response.json()
        );
        return avatars;
    }
}