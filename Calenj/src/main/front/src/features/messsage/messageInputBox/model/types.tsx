export interface MessageInput{
    chatRef: React.RefObject<HTMLInputElement>,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    sendMessage: (e: React.FormEvent<HTMLFormElement>) =>void,
}
