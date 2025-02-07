namespace BusinessLogic.Models;

public class ProductAvailableDto
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
    /// Tipo de producto. I - Artículo | S - Servicio
    /// </summary>
    public string Type { get; set; } = null!;

    /// <summary>
    /// Código de barra asociado a este producto
    /// </summary>
    public string? Barcode { get; set; }

    /// <summary>
    /// Precio actual del producto
    /// </summary>
    public decimal Price { get; set; }

    public int Stock { get; set; }

}