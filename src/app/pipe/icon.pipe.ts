import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const primengIcons :{ [key: string]: string }= {
      'Edit': 'pi pi-pencil',
      'Enroll': 'pi pi-book',
      'Delete': 'pi pi-trash',
      // Add more mappings as needed
    };
    return primengIcons[value] || 'pi pi-check'; // default icon

    }

}
