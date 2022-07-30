
using System.ComponentModel.DataAnnotations;

namespace achappey.Models;

public class Activity 
{
    [Key]
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public Source Source { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

}

public enum Source {
    GITHUB,
    DUOLINGO,
    WAKATIME,
    LASTFM,
    TWITTER,
    LINKEDIN
}