export type LocationObject = {
    lat: number;
    lng: number;
    timestamp: number;
    phone: string;
}

export type User = {
    phone: string,
    username: string,
}

export interface UserDict {
    [key: string]: {
        username: string,
        active: boolean,
    }
}
