namespace BusinessLogic.Models;

/// <summary>
/// Data transfer object de compras
/// </summary>
public partial class PurchaseDto
{
    /// <summary>
    /// Identificador de compra del sistema
    /// </summary>
    public string PurchaseId { get; set; } = null!;

    /// <summary>
    /// Identificador de la factura del proveedor
    /// </summary>
    public string SupplierInvoiceId { get; set; } = null!;

    /// <summary>
    /// Fecha de la compra
    /// </summary>
    public DateTime Date { get; set; }

    /// <summary>
    /// Monto a pagar sin impuestos ni descuento
    /// </summary>
    public decimal Subtotal { get; set; }

    /// <summary>
    /// Descuento ofrecido por el proveedor
    /// </summary>
    public decimal Discount { get; set; }

    /// <summary>
    /// Impuesto total a pagar por la compra
    /// </summary>
    public decimal Tax { get; set; }

    public bool Active { get; set; }

    public IEnumerable<PurchaseDetailDto> Detail { get; set; } = null!;

    public SupplierDto Supplier { get; set; } = null!;
}