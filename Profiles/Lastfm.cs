using achappey.Models;
using achappey.Extensions;

namespace achappey;

public class LastfmProfile : AutoMapper.Profile
{
    public LastfmProfile()
    {
        CreateMap<achappey.Connectors.Lastfm.Models.User, achappey.Models.Profile>()
            .ConstructUsing(a => new Profile()
            {
                Network = NetworkExtensions.LastFm
            })
            .ForMember(
                dest => dest.Id,
                opt => opt.MapFrom(src => src.Url))
            .ForMember(
                dest => dest.CreatedAt,
                opt => opt.MapFrom(src => DateTimeOffset.FromUnixTimeSeconds(long.Parse(src.Registered.UnixTime))))
            .ForMember(
                dest => dest.Username,
                opt => opt.MapFrom(src => src.Name))
            .ForMember(
               dest => dest.Descriptions,
               opt => opt.MapFrom(src => new List<string>()
               {
                    string.Format("Listened {0} songs", src.PlayCount)
               }));

        CreateMap<achappey.Connectors.Lastfm.Models.TopAlbum, Album>()
        .ForMember(
            dest => dest.Image,
            opt => opt.MapFrom(src => src.Image.Count() > 0 ? src.Image.Last().Url : null))
        .ForMember(
            dest => dest.Artist,
            opt => opt.MapFrom(src => src.Artist.Name))
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => 20.GenerateRandomString()));

        CreateMap<achappey.Connectors.Lastfm.Models.Track, Activity>()
        .ConstructUsing(a => new Activity()
        {
            Network = NetworkExtensions.LastFm
        })
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => 20.GenerateRandomString()))
        .ForMember(
            dest => dest.Title,
            opt => opt.MapFrom(src => string.Format("{0} - {1} ({2})", src.Artist.Name, src.Name, src.Album.Name)))
        .ForMember(
            dest => dest.CreatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.FromUnixTimeSeconds(long.Parse(src.Date.Uts))));
    }
}