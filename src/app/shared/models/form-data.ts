import { Button } from "./button";
import { FormField } from "./form-field";

export interface FormData{
    controls: {
        formFields: FormField[];
        buttons?: Button[];
    }
}