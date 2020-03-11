import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../interfaces/task';

/**
 * Generated class for the searchRoutePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchTask'
})
export class SearchTaskPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(tasks: Task[], searchTerm: string) {
    if (searchTerm === undefined) return tasks;

    return tasks.filter((task: Task) => {
      return (
        task.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 || task.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1
      );
    });
  }
}
