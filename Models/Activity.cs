
using System.ComponentModel.DataAnnotations;

namespace achappey.Models;

public class Activity 
{
    [Key]
    public string Id { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string Network { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; }

}

public enum Source2 {
    GITHUB ,
    DUOLINGO,
    WAKATIME,
    LASTFM,
    TWITTER,
    LINKEDIN
}