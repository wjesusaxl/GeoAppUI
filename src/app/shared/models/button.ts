import { Icon } from "./icon";

export interface Button{
    name: string;
    label: string;
    class: string;
    title: string;
    icon?: Icon;
    safeContent? : string;
}