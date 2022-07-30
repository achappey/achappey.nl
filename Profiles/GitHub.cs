using achappey.Extensions;
using achappey.Models;

namespace achappey;

public class GitHubProfile : AutoMapper.Profile
{
    public GitHubProfile()
    {

        CreateMap<Octokit.User, Profile>()
            .ConstructUsing(a => new Profile()
            {
                Network = NetworkExtensions.GitHub
            })
            .ForMember(
               dest => dest.Id,
               opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(
               dest => dest.Url,
               opt => opt.MapFrom(src => src.HtmlUrl))
            .ForMember(
               dest => dest.Username,
               opt => opt.MapFrom(src => src.Login))
            .ForMember(
               dest => dest.Descriptions,
               opt => opt.MapFrom(src => new List<string>()
               {
                string.Format("{0} public repositories", src.PublicRepos),
                string.Format("{0} follower(s)", src.Followers)
               }));


        CreateMap<Octokit.Repository, Repository>()
            .ForMember(
                dest => dest.Id,
                opt => opt.MapFrom(src => src.Id.ToString()));

        CreateMap<Octokit.Activity, Activity>()
            .ConstructUsing(a => new Activity()
            {
                Network = NetworkExtensions.GitHub
            })
            .ForMember(
                dest => dest.Title,
                opt => opt.MapFrom(src => string.Format("{0} {1}", src.Type.ToString(), src.Repo.Name)));
    }
}