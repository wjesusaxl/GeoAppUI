import { DataFieldType } from "../enums/data-field-type";
import { Icon } from "./icon";
import { FieldValidator } from "./field-validator";

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