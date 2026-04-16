namespace MediaManager.Api.Models;

public class MediaType
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public ICollection<MediaItem> MediaItems { get; set; } = [];
}
