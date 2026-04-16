import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MediaItemService } from '../../media-item.service';
import { MediaItem } from '../../media-item.model';
import { MediaTypeService } from '../../media-type.service';
import { MediaType } from '../../media-type.model';

@Component({
  selector: 'app-media-item-page',
  imports: [FormsModule],
  templateUrl: './media-item-page.html',
  styleUrl: './media-item-page.scss'
})
export class MediaItemPage implements OnInit {
  private readonly mediaItemService = inject(MediaItemService);
  private readonly mediaTypeService = inject(MediaTypeService);
  private readonly destroyRef = inject(DestroyRef);

  protected mediaItems = signal<MediaItem[]>([]);
  protected mediaTypes = signal<MediaType[]>([]);

  protected isLoadingItems = signal(false);
  protected isLoadingTypes = signal(false);
  protected isSubmitting = signal(false);

  protected errorMessage = signal('');

  protected editingId = signal<string | null>(null);
  protected formId = signal('');
  protected formTitle = signal('');
  protected formBarcode = signal('');
  protected formMediaTypeId = signal(0);

  ngOnInit(): void {
    this.loadMediaTypes();
    this.loadMediaItems();
  }

  protected loadMediaTypes(): void {
    this.isLoadingTypes.set(true);

    this.mediaTypeService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          const sorted = data.sort((a, b) => a.id - b.id);
          this.mediaTypes.set(sorted);
          this.isLoadingTypes.set(false);

          if (this.formMediaTypeId() === 0 && sorted.length > 0) {
            this.formMediaTypeId.set(sorted[0].id);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingTypes.set(false);
          this.errorMessage.set(this.toErrorMessage(err));
        }
      });
  }

  protected loadMediaItems(): void {
    this.errorMessage.set('');
    this.isLoadingItems.set(true);

    this.mediaItemService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.mediaItems.set(data);
          this.isLoadingItems.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.isLoadingItems.set(false);
          this.errorMessage.set(this.toErrorMessage(err));
        }
      });
  }

  protected startCreate(): void {
    this.editingId.set(null);
    this.formId.set('');
    this.formTitle.set('');
    this.formBarcode.set('');

    const types = this.mediaTypes();
    this.formMediaTypeId.set(types.length > 0 ? types[0].id : 0);
    this.errorMessage.set('');
  }

  protected startEdit(item: MediaItem): void {
    this.editingId.set(item.id);
    this.formId.set(item.id);
    this.formTitle.set(item.title);
    this.formBarcode.set(item.barcode);
    this.formMediaTypeId.set(item.mediaTypeId);
    this.errorMessage.set('');
  }

  protected submit(): void {
    const trimmedTitle = this.formTitle().trim();
    const trimmedBarcode = this.formBarcode().trim();
    const mediaTypeId = this.formMediaTypeId();

    if (!trimmedTitle) {
      this.errorMessage.set('Title is required.');
      return;
    }

    if (!trimmedBarcode) {
      this.errorMessage.set('Barcode is required.');
      return;
    }

    if (mediaTypeId <= 0) {
      this.errorMessage.set('Please select a media type.');
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    const id = this.editingId();

    if (id === null) {
      this.mediaItemService
        .create({ title: trimmedTitle, barcode: trimmedBarcode, mediaTypeId })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.isSubmitting.set(false);
            this.startCreate();
            this.loadMediaItems();
          },
          error: (err: HttpErrorResponse) => {
            this.isSubmitting.set(false);
            this.errorMessage.set(this.toErrorMessage(err));
          }
        });
      return;
    }

    this.mediaItemService
      .update(id, {
        id: this.formId(),
        title: trimmedTitle,
        barcode: trimmedBarcode,
        mediaTypeId
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.startCreate();
          this.loadMediaItems();
        },
        error: (err: HttpErrorResponse) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(this.toErrorMessage(err));
        }
      });
  }

  protected remove(item: MediaItem): void {
    this.errorMessage.set('');

    this.mediaItemService
      .delete(item.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          if (this.editingId() === item.id) {
            this.startCreate();
          }
          this.loadMediaItems();
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
