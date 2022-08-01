using System.ComponentModel.DataAnnotations;

namespace achappey.Models;

public class CodingActivitiy
{
    public IEnumerable<CodingTime> Languages { get; set; } = null!;

    public IEnumerable<CodingTime> Editors { get; set; } = null!;
}


public class CodingTime
{
    public string Name { get; set; } = null!;

    public float Seconds { get; set; }

}