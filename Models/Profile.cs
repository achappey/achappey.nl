
namespace achappey.Models;

public class Profile 
{
    public string Id { get; set; } = null!;

    public string Username { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string? Bio { get; set; }

    public DateTimeOffset? CreatedAt { get; set; }

    public DateTimeOffset? UpdatedAt { get; set; }

    public string Network { get; set; } = null!;

    public IEnumerable<string>? Descriptions { get; set; }

}