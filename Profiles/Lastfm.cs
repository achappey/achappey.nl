using AutoMapper;
using achappey.Models;

namespace achappey;

public class LastfmProfile : Profile
{
    public LastfmProfile()
    {
        CreateMap<achappey.Connectors.Lastfm.Models.TopAlbum, Album>()
        .ForMember(
            dest => dest.Image,
            opt => opt.MapFrom(src => src.Image.Count() > 0 ? src.Image.Last().Url : null))
        .ForMember(
            dest => dest.Artist,
            opt => opt.MapFrom(src => src.Artist.Name))
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Id) ? src.Id : src.Name));

        CreateMap<achappey.Connectors.Lastfm.Models.Track, Activity>()
        .ConstructUsing(a => new Activity()
        {
            Source = Source.LASTFM
        })
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => Source.LASTFM + src.Date.Uts))
        .ForMember(
            dest => dest.Title,
            opt => opt.MapFrom(src => string.Format("{0} - {1} ({2})", src.Artist.Name, src.Name, src.Album.Name)))
        .ForMember(
            dest => dest.CreatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.FromUnixTimeSeconds(long.Parse(src.Date.Uts))));
    }
}