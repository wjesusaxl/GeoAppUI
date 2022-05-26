import { Icon } from "./icon";
import { ButtonEvent } from "./button-event";

export interface Button{
    name: string;
    label: string;
    class: string;
    title: string;
    icon?: Icon;
    safeContent? : string;
    eventToTrigger? : ButtonEvent;
}

