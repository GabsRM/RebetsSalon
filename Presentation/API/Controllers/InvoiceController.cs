using Microsoft.AspNetCore.Mvc;
using BusinessLogic.Service;
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using System.ComponentModel.DataAnnotations;
using Api.Filters;
using System.Collections;
using Microsoft.Reporting.NETCore;
using System.Data;
using DataAccess.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers;

public class InvoiceController : ControllerBaseApi
{
    private readonly ILogger<InvoiceController> _logger;
    private readonly InvoiceService _service;

    public InvoiceController(ILogger<InvoiceController> logger, InvoiceService service)
    {
        _logger = logger;
        _service = service;
    }

    [HttpPost]
    [RoleFilter(ApiRole.Seller)]
    public async Task<ActionResult<BaseResult>> Create([Required(ErrorMessage = Message.Error.INSUFFICIENT_DATA)] InvoiceInputDto product)
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
    [RoleFilter(ApiRole.Seller)]
    public async Task<ActionResult<Result<InvoiceDto>>> Get([Required(ErrorMessage = Message.Error.ID_REQUIRED)] string id)
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
    [RoleFilter(ApiRole.Seller)]
    public async Task<ActionResult<Result<List<InvoiceDto>>>> Get()
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

    [HttpGet("PerMonth")]
    [ProducesResponseType(typeof(Result<List<InvoicePerMonth>>), 200)]
    public async Task<ActionResult> GetInvoicesPerMonth()
    {
        var result = await _service.GetInvoiceCount();

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

    [HttpGet("TypePerMonth")]
    [ProducesResponseType(typeof(Result<List<InvoiceTypeCountPerMonth>>), 200)]
    public async Task<ActionResult> GetInvoicesTypeInMonth()
    {
        var result = await _service.GetInvoiceTypeCountInDate(null);

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
    [RoleFilter(ApiRole.Seller)]
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

    [HttpGet("BestSellings")]
    [ProducesResponseType(typeof(Result<List<BestSellingProduct>>), 200)]
    public async Task<ActionResult> GetBestSellings()
    {
        var result = await _service.GetBestSellingProducts();

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

    [AllowAnonymous]
    [HttpGet("GetInvoiceReport")]
    [ProducesResponseType(typeof(Result<List<BestSellingProduct>>), 200)]
    public async Task<ActionResult> GetInvoiceReport(string invoiceId, [FromServices] InwentContext context)
    {
        string renderFormat = "PDF";
        string extension = "pdf";
        string mimetype = "application/pdf";

        var path = "Reports/Invoice.rdl";

        using var report = new LocalReport();

        using var rdlSR = new StreamReader(path);

        report.LoadReportDefinition(rdlSR);

        report.ReportPath = path;


        var source = await context.InvoiceDetail.Include(x => x.Invoice)
                                                .ThenInclude(x => x.HistoricalExchangeRate)
                                                .Include(x => x.Product)
                                                .Where(x => x.InvoiceId == invoiceId)
                                                .Select(id => new
                                                {
                                                    id.Invoice.InvoiceId,
                                                    id.Invoice.Date,
                                                    id.Invoice.Subtotal,
                                                    id.Invoice.Discount,
                                                    id.Invoice.Tax,
                                                    id.Invoice.Total,
                                                    id.Invoice.HistoricalExchangeRate.ExchangeRate,
                                                    BranchName = id.Invoice.Branch.Name,
                                                    ProductDescription = id.Product.Description,
                                                    id.Quantity,
                                                    ProductSubtotal = id.Subtotal
                                                }).ToListAsync();

        report.DataSources.Add(new ReportDataSource("Invoice", source));

        var pdf = report.Render(renderFormat);
        return File(pdf, mimetype, $"invoice-{invoiceId}");
    }
}
