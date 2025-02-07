using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Service;

public class SessionService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public string? BranchId
    {
        get
        {
            return _httpContextAccessor?.HttpContext?.User.FindFirst(ClaimTypes.Locality)?.Value;
        }
    }

    public string? Username
    {
        get
        {
            return _httpContextAccessor?.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }

    public SessionService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
}