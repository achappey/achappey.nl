using achappey.Models;
using achappey.Extensions;

namespace achappey;

public class WakaTimeProfile : AutoMapper.Profile
{
    public WakaTimeProfile()
    {
        CreateMap<achappey.Connectors.WakaTime.Models.User, Profile>()
          .ConstructUsing(a => new Profile()
          {
              Source = Source.WAKATIME
          })
        .ForMember(
            dest => dest.CreatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.Parse(src.CreatedAt)))
        .ForMember(
            dest => dest.UpdatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.Parse(src.ModifiedAt)))
        .ForMember(
            dest => dest.Url,
            opt => opt.MapFrom(src => string.Format("https://wakatime.com/{0}", src.Username)));

        CreateMap<achappey.Connectors.WakaTime.Models.HeartBeat, Activity>()
        .ConstructUsing(a => new Activity()
        {
            Source = Source.WAKATIME
        })
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => Source.WAKATIME + src.Language + src.Time.ToString()))
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