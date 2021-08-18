import {FormGroup} from "@angular/forms";

export class CustomValidators {
	static matchPassword(form: FormGroup): {mismatch: true} | null {
		if(form.value.password !== form.value.confirmPassword) {
			form.get('confirmPassword')?.setErrors({mismatch: true});

			return {mismatch: true}
		}

		return null;
	}
}
