export type color = 'danger'
		  | 'dark'
		  | 'light'
		  | 'medium'
		  | 'primary'
		  | 'secondary'
		  | 'success'
		  | 'tertiary'
		  | 'warning'
		  | string
		  | undefined;

export type justify = 'end' | 'space-between' | 'start';

export type labelPlacement = 'fixed' | 'floating' | 'stacked' | undefined;

export type mode = 'ios' | 'md';

export interface IonButton {
    buttonType?: string,
    color?: color,
    disabled?: boolean,
    download?: string,
    expand?: 'block' | 'full',
    fill?: 'clear' | 'default' | 'outline' | 'solid',
    form?: HTMLFormElement | string,
    href?: string,
    mode?: 'ios' | 'md',
    rel?: string,
    //routerAnimation?: ((baseEl: any, opts?: any) => Animation),
    routerDirection?: 'back' | 'forward' | 'root',
    shape?: 'round',
    size?: 'default' | 'large' | 'small',
    strong?: boolean,
    target?: string,
    type?: 'button' | 'reset' | 'submit'
};
