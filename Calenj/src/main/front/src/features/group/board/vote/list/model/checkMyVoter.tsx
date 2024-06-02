export const checkMyVoter = (countVoter: string[]): boolean => {
    const userId = localStorage.getItem('userId')||''
    return countVoter.includes(userId);
}
