export default class StateHandler{

    private _state: boolean;
    private _difficulty: number;

    constructor() {
        this._state = false;
        this._difficulty = 2
    }

    public toggle(): void{
        this._state = !this._state
    }

    public get state(): boolean{
        return this._state
    }

    public set state(s: boolean){
        this._state = s
    }

    public set difficulty(num: number){
        this._difficulty = num/25
    }

    public get difficulty(): number{
        return this._difficulty
    }
}