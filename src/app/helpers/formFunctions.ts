import { FormGroup } from "@angular/forms"

export const getControlValue = (control: string, form: FormGroup): string => {
    const controlValue = form.get(control)?.value
    return controlValue || ''
}
export const getErrorClass = (control: string, formGroup: FormGroup, isSend: boolean) => {
    return {
        inputError: getValidControl(control, formGroup, isSend)
    }
}
export const getValidControl = (control: string, fb: FormGroup, isSend: boolean): boolean => {
    const inputValid = fb.get(control);
    return ((inputValid?.touched || inputValid?.dirty || isSend) && inputValid?.invalid) || false;
}