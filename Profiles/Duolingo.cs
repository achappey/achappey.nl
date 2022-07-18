using AutoMapper;
using achappey.Models;

namespace achappey;

public class DuolingoProfile : Profile
{
    public DuolingoProfile()
    {
        CreateMap<ActiveLanguage, IEnumerable<Activity>>()
        .ConvertUsing(a => a.Calendar.Select(b => new Activity()
        {
            Title = string.Format("{0} {1}: {2}", a.Language, b.EventType, a.Skills.First(y => y.Id == b.Skill).Name),
            CreatedAt = b.DateTime,
            Source = Source.DUOLINGO,
            Id =  Source.DUOLINGO + b.DateTime.ToString()
        }));
    }
}