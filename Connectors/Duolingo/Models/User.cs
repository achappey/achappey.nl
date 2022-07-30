namespace achappey.Connectors.Duolingo.Models;

public class User
{

    public string Username { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public int Followers { get; set; }
}
