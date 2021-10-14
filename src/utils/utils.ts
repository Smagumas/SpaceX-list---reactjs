export default class Utils {
    // Only static methods
    static sortAsc(a: any, b: any): number {
        return (a > b) ? 1 : ((b > a) ? -1 : 0);
    }

    static sortDesc(a: any, b: any): number {
        return (a < b) ? 1 : ((b < a) ? -1 : 0);
    }
}