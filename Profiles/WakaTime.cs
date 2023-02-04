using achappey.Models;
using achappey.Extensions;
using System.Globalization;

namespace achappey;

public class WakaTimeProfile : AutoMapper.Profile
{
    public WakaTimeProfile()
    {
        CreateMap<achappey.Connectors.WakaTime.Models.User, Profile>()
          .ConstructUsing(a => new Profile()
          {
              Network = NetworkExtensions.WakaTime
          })
        .ForMember(
            dest => dest.CreatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.Parse(src.CreatedAt)))
        .ForMember(
            dest => dest.UpdatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.Parse(src.ModifiedAt)))
        .ForMember(
            dest => dest.Url,
            opt => opt.MapFrom(src => string.Format("https://wakatime.com/{0}", src.Username)))
        .ForMember(
            dest => dest.Descriptions,
            opt => opt.MapFrom(src => new List<string>()
            {
                string.Format("Using {0}", src.LastPluginName)
            }));

        CreateMap<achappey.Connectors.WakaTime.Models.HeartBeat, Activity>()
        .ConstructUsing(a => new Activity()
        {
            Network = NetworkExtensions.WakaTime
        })
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => 20.GenerateRandomString()))
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