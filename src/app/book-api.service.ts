
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Book {
  title: string;
  author_name?: string[];
  cover_i?: number;
}


@Injectable({ providedIn: 'root' })
export class BookApiService {
  private apiUrl = 'https://openlibrary.org/search.json?q=bestseller&limit=30';

  constructor(private http: HttpClient) {}

  searchBooks(query: string) {
    return this.http.get(`https://openlibrary.org/search.json?q=${query}`);
  }
  getTrendingBooks(): Observable<{ docs: Book[] }> {
    return this.http.get<{ docs: Book[] }>(this.apiUrl);
  }

  getCoverUrl(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

}

