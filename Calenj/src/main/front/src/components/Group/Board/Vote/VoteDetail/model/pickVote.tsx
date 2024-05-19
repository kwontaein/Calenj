export const pickVote = (
    e: React.ChangeEvent<HTMLInputElement>,
    isMultiple: boolean,
    myVote: boolean[] | undefined,
    setMyVote: (myVote: boolean[]) => void
) => {
    if (!myVote) return;

    let newVoter: boolean[];
    if (isMultiple) {
        newVoter = [...myVote];
        newVoter[+e.target.value] = e.target.checked;
    } else {
        newVoter = Array.from({length: myVote.length}, (_, i) => e.target.checked && i === +e.target.value);
    }
    setMyVote(newVoter);
};
