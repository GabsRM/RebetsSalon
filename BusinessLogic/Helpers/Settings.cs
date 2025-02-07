namespace BusinessLogic.Helpers;

public class Settings
{
    public Token TokenSettings { get; set; } = new();

    public ServerFile ServerFileSettings { get; set; } = new();

    public bool IsValid()
    {
        return !string.IsNullOrWhiteSpace(TokenSettings.AudienceToken) && !string.IsNullOrWhiteSpace(TokenSettings.IssuerToken) && !string.IsNullOrWhiteSpace(TokenSettings.SecretKey) && TokenSettings.ExpireTime > 0;
    }
}
