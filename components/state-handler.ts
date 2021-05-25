export default class StateHandler{

    private state: boolean;
    private difficulty: number;

    constructor() {
        this.state = false;
        this.difficulty = 2
    }

    public toggle(): void{
        this.state = !this.state
    }

    public getState(): boolean{
        return this.state
    }

    public updateDifficulty(num: number): void{
        this.difficulty = num/25;
        console.log(this.difficulty)
    }

    public getDifficulty(): number{
        return this.difficulty
    }
}