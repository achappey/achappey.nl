using AutoMapper;
using achappey.Models;
using achappey.Extensions;

namespace achappey;

public class WakaTimeProfile : Profile
{
    public WakaTimeProfile()
    {
        CreateMap<achappey.Connectors.WakaTime.Models.HeartBeat, Activity>()
        .ConstructUsing(a => new Activity()
        {
            Source = Source.WAKATIME
        })
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => Source.WAKATIME + src.Time.ToString()))
        .ForMember(
            dest => dest.Title,
            opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Language)
            ? string.Format("{0}: {1}", src.Category.FirstCharToUpper(), src.Language)
            : src.Category.FirstCharToUpper()))
        .ForMember(
            dest => dest.CreatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.FromUnixTimeSeconds((long)src.Time)));
    }
}