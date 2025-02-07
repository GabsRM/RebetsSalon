using System.Text.Json;
using BusinessLogic.Interfaces;

namespace Api.Middleware;

public class SecurityMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<SecurityMiddleware> _logger;
    private readonly ISecurityService _securityService;

    public SecurityMiddleware(RequestDelegate next, ILogger<SecurityMiddleware> logger, ISecurityService securityService)
    {
        _next = next;
        _logger = logger;
        _securityService = securityService;
    }

    public async Task Invoke(HttpContext context)
    {
        if (_securityService.Activated)
        {
            await _next(context);
            return;
        }

        _logger.LogCritical($"La petición ha sido rechazada porque el sistema se encuentra inactivado");

        var response = new HttpValidationProblemDetails()
        {
            Detail = "Lo sentimos, el sistema se encuentra inactivo. Por favor, contáctese con un administrador",
            Title = "Sistema Inactivado",
            Status = StatusCodes.Status402PaymentRequired
        };

        context.Response.Headers.AccessControlAllowOrigin = "*";
        context.Response.StatusCode = StatusCodes.Status402PaymentRequired;
        context.Response.ContentType = "application/json";

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}