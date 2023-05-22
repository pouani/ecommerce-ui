//methode de troncature
export const useTruncate = (str: string, n: number) => {
    return str.length > n ? str.split('').slice(0, n).join('') + '...' : str;
}