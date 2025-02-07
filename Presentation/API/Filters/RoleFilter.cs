using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Api.Filters;

public class RoleFilter : ActionFilterAttribute, IAsyncActionFilter
{
    private readonly string[] _roles;

    public RoleFilter(params string[] roles)
    {
        _roles = roles;
    }

    async Task IAsyncActionFilter.OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.HttpContext?.User?.Identity is null || !context.HttpContext.User.Identity.IsAuthenticated)
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        // Verificar si el token contiene uno de los roles permitidos
        var claim = context.HttpContext.User.Claims.First(x => x.Type == ClaimTypes.Role);

        var userRoles = claim.Value.Split(',');
        
        bool hasValidRole = _roles.Any(r => userRoles.Contains(r));

        if (!hasValidRole)
        {
            context.Result = new ForbidResult();
            return;
        }
        await next();
    }
}