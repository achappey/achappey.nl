using System.ComponentModel.DataAnnotations;

namespace achappey.Models;

public class Language
{
    public string Name { get; set; } = null!;

    public string Description { get; set; } = "Duolingo";

    [Key]
    public string Code { get; set; } = null!;

    public int Points { get; set; }

    public int Level { get; set; }

    public string? Url  {
        get {
            return Description == "Duolingo" ? string.Format("https://www.duolingo.com/course/{0}/en/Learn-{1}", Code, Name) : null;
        }
    }
}