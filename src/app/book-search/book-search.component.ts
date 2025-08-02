import { Component } from '@angular/core';
import { BookApiService } from '../book-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-book-search',
  standalone: false,
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})
export class BookSearchComponent {
isLoading = false;
hasSearched = false;
searchTerm = '';
  books: any[] = [];

  constructor(private bookService: BookApiService,private snackBar: MatSnackBar) {}

  searchBooks() {
    this.books=[];
    this.isLoading = true;
    this.hasSearched = true;
    this.bookService.searchBooks(this.searchTerm).subscribe((data: any) => {
      this.books = data.docs.slice(0, 10); // Show top 10 results
      this.isLoading = false;
    });
  }
  saveToFavorites(book: any) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.push(book);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  this.snackBar.open('Book added to favorites successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
}


}
