import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MediaTypeService } from '../../media-type.service';
import { MediaType } from '../../media-type.model';

@Component({
  selector: 'app-media-type-page',
  imports: [FormsModule],
  templateUrl: './media-type-page.html',
  styleUrl: './media-type-page.scss'
})
export class MediaTypePage implements OnInit {
  private readonly mediaTypeService = inject(MediaTypeService);
  private readonly destroyRef = inject(DestroyRef);

  protected mediaTypes = signal<MediaType[]>([]);
  protected isLoading = signal(false);
  protected isSubmitting = signal(false);
  protected errorMessage = signal('');

  protected editingId = signal<number | null>(null);
  protected formName = signal('');

  ngOnInit(): void {
    this.loadMediaTypes();
  }

  protected loadMediaTypes(): void {
    this.errorMessage.set('');
    this.isLoading.set(true);

    this.mediaTypeService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.mediaTypes.set(data.sort((a, b) => a.id - b.id));
          this.isLoading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.errorMessage.set(this.toErrorMessage(err));
        }
      });
  }

  protected startCreate(): void {
    this.editingId.set(null);
    this.formName.set('');
    this.errorMessage.set('');
  }

  protected startEdit(item: MediaType): void {
    this.editingId.set(item.id);
    this.formName.set(item.name);
    this.errorMessage.set('');
  }

  protected submit(): void {
    const trimmedName = this.formName().trim();
    if (!trimmedName) {
      this.errorMessage.set('Name is required.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const id = this.editingId();

    if (id === null) {
      this.mediaTypeService
        .create({ id: 0, name: trimmedName })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.startCreate();
            this.loadMediaTypes();
          },
          error: (err: HttpErrorResponse) => {
            this.isSubmitting.set(false);
            this.errorMessage.set(this.toErrorMessage(err));
          }
        });
      return;
    }

    this.mediaTypeService
      .update(id, { id, name: trimmedName })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.startCreate();
          this.loadMediaTypes();
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(this.toErrorMessage(err));
        }
      });
  }

  protected remove(item: MediaType): void {
    this.errorMessage.set('');

    this.mediaTypeService
      .delete(item.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this.editingId() === item.id) {
            this.startCreate();
          }
          this.loadMediaTypes();
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage.set(this.toErrorMessage(err));
        }
      });
  }

  protected cancelEdit(): void {
    this.startCreate();
  }

  private toErrorMessage(err: HttpErrorResponse): string {
    if (err.error && typeof err.error === 'string') {
      return err.error;
    }

    return 'Request failed. Ensure the backend API is running on http://localhost:5012.';
  }
}
