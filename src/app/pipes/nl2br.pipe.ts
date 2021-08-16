import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nl2br'
})
export class Nl2brPipe implements PipeTransform {

	transform(value: string, ...args: any[]): any {
		if(value) {
			return value.replace(/\n/g, '<br/>');
		}

		return null;
	}

}
