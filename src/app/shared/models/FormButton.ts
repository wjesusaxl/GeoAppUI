import { Icon } from "./Icon";
import { Process } from "./Process"

export interface FormButton{
    name: string;
    label: string;
    class: string;
    title: string;
    icon?: Icon;
    safeContent? : string;
    process : Process;
    type: string;
}

