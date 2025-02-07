using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using DataAccess.Context;
using BusinessLogic.Service;
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using System.ComponentModel.DataAnnotations;
using BusinessLogic.Interfaces;
using Api.Filters;

namespace Api.Controllers;

public class ProductController : ControllerBaseApi
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _service;

    public ProductController(ILogger<ProductController> logger, IProductService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost]
    [RoleFilter(ApiRole.InventoryManager)]
    [ProducesResponseType(typeof(BaseResult), 200)]
    public async Task<ActionResult> Create([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] ProductInputDto product)
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
    [RoleFilter(ApiRole.InventoryManager)]
    [ProducesResponseType(typeof(Result<ProductDto>), 200)]
    public async Task<ActionResult> Get([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id)
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
    [RoleFilter(ApiRole.InventoryManager)]
    [ProducesResponseType(typeof(Result<List<ProductDto>>), 200)]
    public async Task<ActionResult> Get()
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
    [RoleFilter(ApiRole.InventoryManager)]
    [ProducesResponseType(typeof(BaseResult), 200)]
    public async Task<ActionResult<BaseResult>> Update([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id, [Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] ProductInputDto product)
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
    [RoleFilter(ApiRole.InventoryManager)]
    [ProducesResponseType(typeof(BaseResult), 200)]
    public async Task<ActionResult> Delete([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id)
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

    [HttpGet("/api/[controller]ByType/{type}")]
    [ProducesResponseType(typeof(Result<List<ProductDto>>), 200)]
    public async Task<ActionResult> GetService(
        [Required(ErrorMessage = Message.Error.ID_REQUIRED)]
        [RegularExpression("I|S", ErrorMessage = "No corresponse a un tipo de servicio")]
        string type
    )
    {
        var result = await _service.GetByType(type);

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

    [HttpGet("Available")]
    [RoleFilter(ApiRole.Seller)]
    [ProducesResponseType(typeof(Result<List<ProductAvailableDto>>), 200)]
    public async Task<ActionResult> GetAvailable()
    {
        var result = await _service.GetAvailable();

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
