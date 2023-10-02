import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: any[], searchMovie: string): any {
    if (!movies) {
      return [];
    }
    if (!searchMovie) {
      return movies;
    }
    searchMovie =searchMovie.toLowerCase();

    return movies.filter(movies=>{
      return (
        movies.moviename.toLowerCase().includes(searchMovie) ||
        movies.languages.toLowerCase().includes(searchMovie) ||
        movies.category.toLowerCase().includes(searchMovie) ||
        movies.screen.toLowerCase().includes(searchMovie) 
        
      );
    });
  }

}
