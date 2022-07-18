using System.ComponentModel.DataAnnotations;

namespace achappey.Models;

public class Album
{
    public string Name { get; set; } = null!;

    public string Artist { get; set; } = null!;

    [Key]
    public string Id { get; set; } = null!;

    public string Url { get; set; } = null!;

    public string? Image { get; set; }

}