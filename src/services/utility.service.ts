export class UtilityService {

    static referralCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = characters.length;
        for (let i = 0; i < 11; i++) {
            result += characters.charAt(Math.floor(Math.random() * length));
        }
        return result;
    }
}