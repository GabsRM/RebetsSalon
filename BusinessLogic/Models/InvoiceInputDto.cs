using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

public class InvoiceInputDto
{
    /// <summary>
    /// Monto de descuento ofrecido al subtotal de esta factura
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public decimal Discount { get; set; }

    public IEnumerable<InvoiceDetailInputDto> Details { get; set; } = null!;
}