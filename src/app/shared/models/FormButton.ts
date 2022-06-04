import { Icon } from "./Icon";
import { EventToTrigger } from "./Event"

export interface FormButton{
    name: string;
    label: string;
    class: string;
    title: string;
    icon?: Icon;
    safeContent? : string;
    eventsToTrigger? : EventToTrigger;
}

