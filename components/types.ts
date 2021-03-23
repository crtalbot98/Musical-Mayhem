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