using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

public partial class PurchaseDetailInputDto
{
    /// <summary>
    /// Identificador del producto
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [StringLength(5, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string ProductId { get; set; } = null!;

    /// <summary>
    /// Costo unitario del producto
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public decimal UnitCost { get; set; }

    /// <summary>
    /// Cantidad comprada del producto
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public int Quantity { get; set; }

    /// <summary>
    /// Precio sugerido de venta
    /// </summary>
    public decimal? SuggestedRetailPrice { get; set; }
}