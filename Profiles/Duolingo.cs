using achappey.Models;
using achappey.Extensions;
using achappey.Connectors.Duolingo;

namespace achappey;

public class DuolingoProfile : AutoMapper.Profile
{
    public DuolingoProfile()
    {
        CreateMap<achappey.Connectors.Duolingo.Models.Language, Language>();

        CreateMap<achappey.Connectors.Duolingo.Models.User, Profile>()
        .ConstructUsing(a => new Profile()
        {
            Network = NetworkExtensions.Duolingo,
            Id = string.Format("{0}/{1}", DuolingoClient.DUOLINGO_URL, a.Username),
            Url = string.Format("{0}/{1}", DuolingoClient.DUOLINGO_URL, a.Username)
        })
          .ForMember(
               dest => dest.Descriptions,
               opt => opt.MapFrom(src => new List<string> ()
               {
                string.Format("{0} day streak", src.Streak),
                string.Format("{0} follower(s)", src.Followers)
               }));

        CreateMap<achappey.Connectors.Duolingo.Models.ActiveLanguage, IEnumerable<Activity>>()
        .ConvertUsing(a => a.Calendar.Select(b => new Activity()
        {
            Title = a.Skills.Any(y => y.Id == b.Skill) ?
                string.Format("{0} {1}: {2} ({3} XP)", a.Language, b.EventType, a.Skills.First(y => y.Id == b.Skill).Name, b.Improvement)
                : string.Format("Duolingo {0} ({1} XP)", b.EventType, b.Improvement),
            CreatedAt = b.DateTime,
            Network = NetworkExtensions.Duolingo,
            Id = 20.GenerateRandomString()
        }));
    }
}