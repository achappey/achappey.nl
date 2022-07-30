
using System.Text.Json.Serialization;

namespace achappey.Connectors.Lastfm.Models;

public class Track
{
    public string Name { get; set; } = null!;

    public string Url { get; set; } = null!;

    public Date Date { get; set; } = null!;

    public Related Artist { get; set; } = null!;
    
    public Related Album { get; set; } = null!;

    public IEnumerable<Image> Image { get; set; } = null!;
}

public class RecentTracks
{
    public IEnumerable<Track> Track { get; set; } = null!;
}

public class LastfmRecentTracksResponse
{
    [JsonPropertyName("recenttracks")]
    public RecentTracks? RecentTracks { get; set; }
}
