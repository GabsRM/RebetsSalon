using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using DataAccess.Context;
using BusinessLogic.Service;
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using System.ComponentModel.DataAnnotations;
using Api.Utils;
using Api.Filters;

namespace Api.Controllers;

[RoleFilter(ApiRole.InventoryManager)]
public class PurchaseController : ControllerBaseApi
{
    private readonly ILogger<PurchaseController> _logger;
    private readonly PurchaseService _service;

    public PurchaseController(ILogger<PurchaseController> logger, PurchaseService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<BaseResult>> Create([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] PurchaseInputDto product)
    {
        var result = await _service.Create(product);

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

    [HttpGet("{id}")]
    public async Task<ActionResult<Result<PurchaseDto>>> Get([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id)
    {
        var result = await _service.Get(id);

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

    [HttpGet]
    public async Task<ActionResult<Result<List<PurchaseDto>>>> Get()
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

    [HttpDelete("{id}")]
    public async Task<ActionResult<BaseResult>> Delete([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id)
    {
        var result = await _service.Delete(id);

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
