import { Component } from '@angular/core';
import { Book, BookApiService } from '../book-api.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
trendingBooks: Book[] = [];

  constructor(private bookService: BookApiService) {}

  ngOnInit(): void {
    this.bookService.getTrendingBooks().subscribe(response => {
      this.trendingBooks = response.docs;
    });
  }

  getCover(book: Book): string {
    return book.cover_i ? this.bookService.getCoverUrl(book.cover_i) : 'assets/placeholder.jpg';
  }

}
