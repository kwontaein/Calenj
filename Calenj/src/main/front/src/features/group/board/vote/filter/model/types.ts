export interface VoteFilerProps{
    content:string,
    target:string,
    isChecked : boolean,
    updateCheckState : (target:string) => void,
}

export interface VoteToggleProps{
    target: string,
    toggleState: boolean,
    isChecked : boolean,
    updateToggle : (target:string) =>void,
}