
namespace BusinessLogic.Models;

public record InvoicePerMonth(int Year, int Month, int InvoiceCount);

public record InvoiceTypeCountPerMonth(int Year, int Month, int InvoiceCount, string Type);

public class InvoiceDto
{
    /// <summary>
    /// Identificador único de factura
    /// </summary>
    public string InvoiceId { get; set; } = null!;

    /// <summary>
    /// Fecha en la que se generó la factura
    /// </summary>
    public DateTime Date { get; set; }

    /// <summary>
    /// Suma del valor bruto de los productos
    /// </summary>
    public decimal Subtotal { get; set; }

    /// <summary>
    /// Monto de descuento ofrecido al subtotal de esta factura
    /// </summary>
    public decimal Discount { get; set; }

    /// <summary>
    /// Monto de impuesto aplicado al Subtotal - Discount
    /// </summary>
    public decimal Tax { get; set; }

    /// <summary>
    /// Monto total a pagar por el cliente
    /// </summary>
    public decimal Total { get; set; }

    public bool Active { get; set; }

    public InvoiceBranchDto Branch { get; set; } = null!;

    public IEnumerable<InvoiceDetailDto> Details { get; set; } = null!;
}