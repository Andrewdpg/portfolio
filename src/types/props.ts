export type ToastConfig = {
    toast: boolean;
    position: 'top-end' | 'top-start' | 'top' | 'bottom-end' | 'bottom-start' | 'bottom';
    showConfirmButton: boolean;
    timer: number;
    timerProgressBar: boolean;
    didOpen: (toast: HTMLElement) => void;
}