import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
favoriteBooks: any[] = [];
constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.favoriteBooks = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  removeFromFavorites(bookToRemove: any) {
    if (confirm(`Remove "${bookToRemove.title}" from favorites?`)) {
    const updatedFavorites = this.favoriteBooks.filter(book => book.key !== bookToRemove.key);
    this.favoriteBooks = updatedFavorites;
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    this.snackBar.open('Cleared from favorites !', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
 }
  
}

clearAllFavorites() {
  if (confirm('Are you sure you want to remove all favorite books?')) {
    localStorage.removeItem('favorites');
    this.favoriteBooks = [];
    this.snackBar.open('All favorites cleared successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

exportToCSV() {
  const headers = ['Title', 'Author', 'First Published', 'Subject', 'ISBN', 'Cover Image URL'];

  const rows = this.favoriteBooks.map(book => [
    `"${book.title}"`,
    `"${book.author_name?.[0] || 'Unknown'}"`,
    `"${book.first_publish_year || 'N/A'}"`,
    `"${book.subject?.slice(0, 3).join('; ') || 'N/A'}"`, // Limit to 3 subjects
    `"${book.isbn?.[0] || 'N/A'}"`, // Use first ISBN if available
    `"https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg"` || 'N/A'
  ]);

  const csvContent = [headers, ...rows]
    .map(e => e.join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'favorite-books.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  this.snackBar.open('Favorites exported as CSV!', 'Close', {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
});

}


}
