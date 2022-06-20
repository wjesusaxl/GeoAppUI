import { FormButton } from "./FormButton";
import { FormField } from "./FormField";
import { ProcessResult } from "./ProcessResult";

export interface FormData{
    controls: {
        formFields: FormField[];
        buttons?: FormButton[];
    }
}