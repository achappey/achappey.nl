using AutoMapper;
using achappey.Models;

namespace achappey;

public class GitHubProfile : Profile
{
    public GitHubProfile()
    {
        CreateMap<Octokit.Repository, achappey.Models.Repository>()
            .ForMember(
                dest => dest.Id,
                opt => opt.MapFrom(src => src.Id.ToString())
            );

        CreateMap<Octokit.Activity, achappey.Models.Activity>()
        .ForMember(
                dest => dest.Source,
                opt => opt.MapFrom(a => Source.GITHUB))
            .ForMember(
                dest => dest.Title,
                opt => opt.MapFrom(src => string.Format("{0} {1}", src.Type.ToString(), src.Repo.Name)));
    }
}