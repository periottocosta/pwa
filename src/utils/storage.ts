export const saveInfo = (info: string, key: string) => {
    try {
        localStorage.setItem(key, info);
    } catch (error) {
        throw error;
    }
}

export const getInfo = (key: string): string | null => {
    try {
        const info = localStorage.getItem(key);
        return info;
    } catch (error) {
        throw error;
    }
}