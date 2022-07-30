using achappey.Models;
using achappey.Extensions;

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
            Id = string.Format("https://duolingo.com/{0}", a.Username),
            Url = string.Format("https://duolingo.com/{0}", a.Username)
        });
        /*
        .ForMember(
                dest => dest.Network,
                opt => opt.MapFrom(a => NetworkExtensions.Duolingo))
        .ForMember(
                dest => dest.Id,
                opt => opt.MapFrom(a => string.Format("https://duolingo.com/{0}", a.Username)))
        .ForMember(
                dest => dest.Url,
                opt => opt.MapFrom(a => string.Format("https://duolingo.com/{0}", a.Username)));*/


        CreateMap<achappey.Connectors.Duolingo.Models.ActiveLanguage, IEnumerable<Activity>>()
        .ConvertUsing(a => a.Calendar.Select(b => new Activity()
        {
            Title = a.Skills.Any(y => y.Id == b.Skill) ? string.Format("{0} {1}: {2} ({3} XP)", a.Language, b.EventType, a.Skills.First(y => y.Id == b.Skill).Name, b.Improvement)
                : string.Format("Duolingo {0} ({1} XP)", b.EventType, b.Improvement),
            CreatedAt = b.DateTime,
            Network = NetworkExtensions.Duolingo,
            Id = NetworkExtensions.Duolingo + b.DateTime.ToString()
        }));
    }
}