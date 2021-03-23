import ObjectHandler from "./object-handler.js";
import {Controller} from "./controller.js";
import Player from "./player.js";
import {controlPressed} from "../helpers.js";

export default class Game{

    protected time: number = window.performance.now();
    public c: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    protected objectHandler: ObjectHandler;
    protected player: Player;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.c = canvas;
        this.ctx = ctx;
        this.objectHandler = new ObjectHandler(this.ctx);
        this.player = new Player(this.c);
    }

    protected update(frame: number): void{
        this.player.updatePos();
    }

    protected draw(): void{
        this.ctx.clearRect(this.c.offsetWidth * 0.2, 0, this.c.offsetWidth*0.6, this.c.height);
        this.player.create(this.ctx)
        // for(let i = 0; i < this.objectHandler.getObject().length; i++){
        //     //Draw objects
        // }
    }

    public loop(): void{
        const animate = (): void => {
            window.requestAnimationFrame(animate);
            this.update(this.time);
            this.draw();
        };

        animate();
    }

    public initControls(): void{
        document.addEventListener('keydown',(e) => {
            if(Controller[e.keyCode]){
                if(!controlPressed()){
                    Controller[e.keyCode].pressed = true;
                    Controller[e.keyCode].func(this.player, this.c);
                }
            }
        });

        document.addEventListener('keyup', (e) => {
            if(Controller[e.keyCode]){
                Controller[e.keyCode].pressed = false;
            }
        })
    }
}