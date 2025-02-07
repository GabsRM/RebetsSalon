using Microsoft.AspNetCore.Mvc;
using BusinessLogic.Service;
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using System.ComponentModel.DataAnnotations;
using Api.Filters;

namespace Api.Controllers;

[RoleFilter(ApiRole.InventoryManager)]
public class SupplierController : ControllerBaseApi
{
    private readonly ILogger<SupplierController> _logger;
    private readonly SupplierService _service;

    public SupplierController(ILogger<SupplierController> logger, SupplierService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<BaseResult>> Create([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] SupplierInputDto product)
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
    public async Task<ActionResult<Result<SupplierDto>>> Get([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id)
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
    public async Task<ActionResult<Result<List<SupplierDto>>>> Get()
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

    [HttpPut("{id}")]
    public async Task<ActionResult<BaseResult>> Update([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id, [Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] SupplierInputDto product)
    {
        var result = await _service.Update(id, product);

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
