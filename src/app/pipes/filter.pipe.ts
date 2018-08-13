import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const listItems = [];
    if(value.length === 0 || arg.length === 0) return listItems;

    for (const item of value) 
    {
      if(!item["name"].search(new RegExp(arg, "i")))
      {
        listItems.push(item);
      }
    }
    return listItems;
  }

}
