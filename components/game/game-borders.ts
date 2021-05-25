export default class GameBorder{

    private ctx: CanvasRenderingContext2D;
    private c: HTMLCanvasElement;

    constructor(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement) {
        this.ctx = ctx;
        this.c = c
    }

    public create(): void{
        this.ctx.fillStyle = 'rgb(20, 20, 20)';
        this.ctx.fillRect(0,0,this.c.offsetWidth * 0.2, this.c.height);
        this.ctx.fillRect(this.c.offsetWidth-this.c.offsetWidth * 0.2,0,this.c.offsetWidth * 0.2, this.c.height);
    }
}