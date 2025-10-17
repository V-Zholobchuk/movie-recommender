import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  
  private readonly baseUrl = 'https://image.tmdb.org/t/p/w500';

  transform(value: string | null): string {
    if (value) {
      return this.baseUrl + value;
    }
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
}