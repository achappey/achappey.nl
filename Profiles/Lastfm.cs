using AutoMapper;
using achappey.Models;

namespace achappey;

public class LastfmProfile : Profile
{
    public LastfmProfile()
    {
        CreateMap<achappey.Connectors.Lastfm.Models.Track, Activity>()
        .ConstructUsing(a => new Activity()
        {
            Source = Source.LASTFM
        })
        .ForMember(
            dest => dest.Id,
            opt => opt.MapFrom(src => src.Date.Uts))
        .ForMember(
            dest => dest.Title,
            opt => opt.MapFrom(src => string.Format("{0} - {1} ({2})", src.Artist.Name, src.Name, src.Album.Name)))
        .ForMember(
            dest => dest.CreatedAt,
            opt => opt.MapFrom(src => DateTimeOffset.FromUnixTimeSeconds(long.Parse(src.Date.Uts))));
    }
}