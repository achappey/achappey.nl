
using System.Text.Json.Serialization;

namespace achappey.Connectors.Lastfm.Models;

public class Album
{

    public string Name { get; set; } = null!;

    public string Url { get; set; } = null!;
    
    [JsonPropertyName("mbid")]
    public string Id { get; set; } = null!;

    public IEnumerable<Image> Image { get; set; } = null!;

    public Artist Artist { get; set; } = null!;
}


public class TopAlbum : Album
{
    [JsonPropertyName("playcount")]
    public string PlayCount { get; set; } = null!;
}



public class TopAlbums
{
    public IEnumerable<TopAlbum> Album { get; set; } = null!;
}

public class LastfmTopAlbumsResponse
{
    [JsonPropertyName("topalbums")]
    public TopAlbums? TopAlbums { get; set; }
}

