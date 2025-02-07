using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

/// <summary>
/// Data transfer object de compras
/// </summary>
public partial class PurchaseInputDto
{
    /// <summary>
    /// Identificador de la factura del proveedor
    /// </summary>
    [StringLength(10, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public string SupplierInvoiceId { get; set; } = null!;

    /// <summary>
    /// Fecha de la compra
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public DateTime Date { get; set; }

    /// <summary>
    /// Descuento ofrecido por el proveedor
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public decimal Discount { get; set; }

    /// <summary>
    /// Subtotal ofrecido por el proveedor
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public decimal Subtotal { get; set; }

    /// <summary>
    /// Impuesto total a pagar por la compra
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public decimal Tax { get; set; }

    [StringLength(5, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string BranchId { get; set; } = null!;

    /// <summary>
    /// Identificador del proveedor
    /// </summary>
    [StringLength(5, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string SupplierId { get; set; } = null!;

    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public IEnumerable<PurchaseDetailInputDto> Detail { get; set; } = null!;
}