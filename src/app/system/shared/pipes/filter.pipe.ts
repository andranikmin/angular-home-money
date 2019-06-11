import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'amFilter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any, value: any, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((i) => {
      const t = {...i};
      if (field === 'type') {
        t[field] = t[field] === 'income' ? 'доход' : 'расход';
      }

      if (field === 'category') {
        t[field] = t['catName'];
      }

      return t[field].toString().toLowerCase().indexOf(value.toString().toLowerCase()) !== -1;
    });
  }
}
