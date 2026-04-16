namespace MediaManager.Api.Models;

public class MediaItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Barcode { get; set; } = string.Empty;
    public int MediaTypeId { get; set; }

    public MediaType? MediaType { get; set; }
}
