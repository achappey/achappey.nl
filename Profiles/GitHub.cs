using AutoMapper;

namespace achappey;

public class GitHubProfile : Profile
{
    public GitHubProfile()
    {
        CreateMap<Octokit.Repository, achappey.Models.Repository>()
            .ForMember(
                dest => dest.Id,
                opt => opt.MapFrom(src => src.Id.ToString())
            );/*
            .ForMember(
                dest => dest.Name,
                opt => opt.MapFrom(src => src.Name)
            );*/

    }
}