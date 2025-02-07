namespace BusinessLogic.Helpers;

public class Token
{
    public string SecretKey { get; set; } = string.Empty;
    
    public string AudienceToken { get; set; } = string.Empty;
    
    public string IssuerToken { get; set; } = string.Empty;
    
    public int ExpireTime { get; set; }
}