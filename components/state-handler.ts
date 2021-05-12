export default class StateHandler{

    private state: string;
    private states: string[];

    constructor() {
        this.states = ['paused', 'play'];
        this.state = this.states[0];
    }

    public updateState(state: string): void{
        const i = this.states.indexOf(state);
        if(i !== -1) this.state = this.states[i]
    }

    public getState(): string{
        return this.state
    }
}