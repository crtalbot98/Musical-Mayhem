export default class GameBorder{

    private _ctx: CanvasRenderingContext2D;
    private _c: HTMLCanvasElement;

    constructor(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement) {
        this._ctx = ctx;
        this._c = c
    }

    public create(): void{
        this._ctx.fillStyle = 'rgb(20, 20, 20)';
        this._ctx.fillRect(0,0,this._c.offsetWidth * 0.2, this._c.height);
        this._ctx.fillRect(this._c.offsetWidth-this._c.offsetWidth * 0.2,0,this._c.offsetWidth * 0.2, this._c.height);
    }
}