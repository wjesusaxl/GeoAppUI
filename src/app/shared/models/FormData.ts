import { FormButton } from "./FormButton";
import { FormField } from "./FormField";

export interface FormData{
    controls: {
        formFields: FormField[];
        buttons?: FormButton[];
    }
}