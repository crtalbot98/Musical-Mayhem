export type Coords = {
    x: number,
    y: number,
    side: string
}

export type Size = {
    w: number,
    h: number
}

export type PlayerController = {
    [key: number]: Control
}

type Control = {
    pressed: boolean,
    func: any
}

export type Bounds = {
    [key: string]: Bound
}

export type Bound = {
    [key: string]: number
}

export type Params = {
    access_token: string,
    refresh_token: string,
    user_id: string
}