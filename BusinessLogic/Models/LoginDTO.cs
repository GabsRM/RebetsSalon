namespace BusinessLogic.Models;

public class LoginDto
{
    public string Token { get; set; } = string.Empty;
    
    public UserDto User { get; set; } = new();
    
}