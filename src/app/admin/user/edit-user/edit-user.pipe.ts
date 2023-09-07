import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class EditUserPipe implements PipeTransform {
  transform(value: any[], searchName: string): any[] {
    if (!searchName || searchName === '') {
      return value;
    }

    const filteredValue = value.filter((item) =>
      item.user.userName.toLowerCase().includes(searchName.toLowerCase()) ||
      item.user.email.toLowerCase().includes(searchName.toLowerCase())
    );
    
    return filteredValue;
  }
  
}