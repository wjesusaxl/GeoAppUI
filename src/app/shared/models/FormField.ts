import { DataFieldType } from "../enums/DataFieldType";
import { Icon } from "./Icon";
import { FieldValidator } from "./FiieldValidator";

export interface FormField{
    name: string;
    label: string;
    defaultValue: string;
    type: DataFieldType;    
    small: string;
    placeholder: string;
    icon?: Icon;
    fieldValidator?: FieldValidator;
    safeContent?: string;
    visible: boolean;
}