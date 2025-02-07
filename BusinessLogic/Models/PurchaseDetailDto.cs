
namespace BusinessLogic.Models;

public partial class PurchaseDetailDto
{
    /// <summary>
    /// Identificador del producto
    /// </summary>
    public string ProductId { get; set; } = null!;

    /// <summary>
    /// Breve descripción del producto
    /// </summary>
    public string Description { get; set; } = null!;

    /// <summary>
    /// Costo unitario del producto
    /// </summary>
    public decimal UnitCost { get; set; }

    /// <summary>
    /// Cantidad comprada del producto
    /// </summary>
    public decimal Quantity { get; set; }

    /// <summary>
    /// Precio sugerido de venta
    /// </summary>
    public decimal? SuggestedRetailPrice { get; set; }
}