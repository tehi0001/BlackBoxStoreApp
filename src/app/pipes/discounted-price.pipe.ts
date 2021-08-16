import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountedPrice'
})
export class DiscountedPricePipe implements PipeTransform {

	transform(value: number, discount: number): number {
		return value - (value * (discount / 100));
	}

}
