using achappey.Models;

namespace achappey.Extensions;

public static class NetworkExtensions
{
    public static readonly string GitHub = "GitHub";

    public static readonly string Duolingo = "Duolingo";

    public static readonly string LastFm = "Last.fm";

    public static readonly string Twitter = "Twitter";

    public static readonly string LinkedIn = "LinkedIn";
    
    public static readonly string WakaTime = "WakaTime";
    
    public static readonly IEnumerable<Language> BaseLanguages = new List<Language>() {
        new Language() {
            Code = "nl",
            Name = "Dutch",
            Description = "Native",
            Points = 999999,
            Level = 99
        },
        new Language() {
            Code = "gb",
            Name = "English",
            Description = "Professional",
            Points = 100000,
            Level = 75
        }

    };

     public static readonly IEnumerable<Profile> BaseProfiles = new List<Profile>() {
        new Profile() {
            Username = "achappey",
            Network = NetworkExtensions.Twitter,
            Id = "https://twitter.com/achappey",
            Url = "https://twitter.com/achappey"
        },

        new Profile() {
            Username = "achappey",
            Network = NetworkExtensions.LinkedIn,
            Id = "https://nl.linkedin.com/in/achappey",
            Url = "https://nl.linkedin.com/in/achappey"
        }

    };
}
