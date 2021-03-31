import Game from "./components/game.js";

(async function () {

    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    initCanvas(canvas, ctx);

    const game = new Game(canvas, ctx);
    game.loop();

    window.addEventListener('resize', () => {
        initCanvas(canvas, ctx)
    });

    game.initControls()
})();

function initCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .9;
}