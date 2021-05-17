import ObjectHandler from "./object-handler.js";
import {Controller} from "./controller.js";
import Player from "./player.js";
import GameBorder from "./game-borders.js";
import {controlPressed} from "../helpers.js";
import StateHandler from "../state-handler.js";

export default class Game{

    protected time: number = window.performance.now();
    public c: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;
    protected objectHandler: ObjectHandler;
    protected player: Player;
    protected gameBorder: GameBorder;
    private stateHandler: StateHandler;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: StateHandler) {
        this.c = canvas;
        this.ctx = ctx;
        this.objectHandler = new ObjectHandler(this.ctx, this.c);
        this.player = new Player(this.c);
        this.gameBorder = new GameBorder(this.ctx, this.c);
        this.stateHandler = state;
        window.setInterval(() => {
            this.objectHandler.addToObjects()
        }, 1200)
    }

    protected update(frame: number): void{ // Updates data for objects and scene
        this.player.updatePos(this.objectHandler.getObjects());
        this.objectHandler.updateByFrame();
    }

    protected draw(): void{ // Draws the scene every frame
        this.ctx.clearRect(0, 0, this.c.width, this.c.height); // Clears game scene

        this.gameBorder.create(); // border for the game area

        this.player.create(this.ctx); // player

        this.objectHandler.createByFrame() // All objects in object array
    }

    public loop(): void{ // Creates the animation loop
        const animate = (): void => {
            window.requestAnimationFrame(animate);
            this.update(this.time);
            this.draw();
        };

        animate();
    }

    public initControls(): void{ // Creates the player controls
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