export interface MediaItem {
  id: string;
  title: string;
  barcode: string;
  mediaTypeId: number;
  mediaType?: {
    id: number;
    name: string;
  };
}

export interface MediaItemUpsert {
  id: string;
  title: string;
  barcode: string;
  mediaTypeId: number;
}
