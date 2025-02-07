using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

using Api.Utils;
using BusinessLogic.Service;
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using System.Security.Claims;
using Api.Filters;

namespace Api.Controllers;

public class AuthController : ControllerBaseApi
{
    private readonly ILogger<AuthController> _logger;
    private readonly AuthService _service;

    public AuthController(ILogger<AuthController> logger, AuthService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult<Result<LoginDto>>> Authenticate([FromRouteRequired("Se debe proporcionar un usuario")] string username, [FromRouteRequired("Se debe proporcionar una contraseña")] string password)
    {
        var result = await _service.Authenticate(username, password);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpPost("User")]
    [RoleFilter(ApiRole.Administrator)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<BaseResult>> CreateUser([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] UserDataInputDto user)
    {
        var result = await _service.Create(user);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpGet("User/{username}")]
    [RoleFilter(ApiRole.Administrator)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Result<UserDto>>> Get(string username)
    {
        var result = await _service.Get(username);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpGet("User")]
    [RoleFilter(ApiRole.Administrator)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Result<List<UserDto>>>> Get()
    {
        var result = await _service.Get();

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpPut("User")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<BaseResult>> Update([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] UserDataInputDto user)
    {
        var result = await _service.Update(user.Username, user);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpPut("User/Security")]
    [RoleFilter(ApiRole.Administrator)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<BaseResult>> Update([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] UserSecurityInputDto user)
    {
        var result = await _service.UpdateSecurityData(user.Username, user);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpPut("User/Password")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<BaseResult>> Update([FromRouteRequired(Message.Error.INSUFFICIENT_DATA)] string password, [FromRouteRequired(Message.Error.INSUFFICIENT_DATA)] string newPassword)
    {
        var username = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? string.Empty;

        var result = await _service.UpdatePassword(username, password, newPassword);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpDelete("User/{username}")]
    [RoleFilter(ApiRole.Administrator)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<BaseResult>> Delete(string username)
    {
        var result = await _service.Delete(username);

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }

    [HttpGet("Session")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Result<LoginDto>>> GetSession()
    {
        var result = await _service.RefreshSession();

        if (result.Exception is not null)
        {
            _logger.LogError(result.Exception, result.Exception.Message);
            return StatusCode(StatusCodes.Status500InternalServerError, result);
        }

        if (!result.Success)
        {
            _logger.LogWarning(result.Message);
            return ValidationProblem(result.Message);
        }

        return Ok(result);
    }
}
