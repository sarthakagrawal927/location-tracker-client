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

declare global {
    // note, if you augment `WindowEventMap`, the event would be recognized if you
    // are doing window.addEventListener(...), but element would not recognize I believe; 
    // there are also
    // - ElementEventMap, which I believe you can document.addEventListener(...)
    // - HTMLElementEventMap (extends ElementEventMap), allows you to element.addEventListener();
    interface WindowEventMap {
        "newPosition": CustomEvent<LocationObject>;
        "subscribe": CustomEvent<string>;
    }
}