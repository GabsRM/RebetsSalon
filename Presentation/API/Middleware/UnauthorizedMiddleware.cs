using System.Text.Json;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Api.Middleware;

public class UnauthorizedMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<UnauthorizedMiddleware> _logger;

    public UnauthorizedMiddleware(RequestDelegate next, ILogger<UnauthorizedMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        await _next(context);

        if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
        {
            _logger.LogWarning($"La solicitud HTTP devolvió una respuesta 401 para la ruta {context.Request.Path}");

            var response = new HttpValidationProblemDetails()
            {
                Detail = "No estás autorizado para acceder a este recurso.",
                Title = "Sin autorización",
                Status = StatusCodes.Status401Unauthorized
            };

            context.Response.ContentType = "application/json";

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}