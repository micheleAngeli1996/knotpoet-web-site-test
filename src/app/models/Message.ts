export interface IMessage {
    type: 'success' | 'error' | 'info';
    text: string;
}