namespace BusinessLogic.Models;

public record BestSellingProduct(string productId, string description, int sales);

public class ProductDto
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

    /// <summary>
    /// Existencias mínimas del producto
    /// </summary>
    public int? MinStock { get; set; }

    public int TotalStock { get; set; }

    public int LocalStock { get; set; }

    public IEnumerable<string> Categories { get; set; } = null!;

    public IEnumerable<ProductBranchDto> ProductPerBranch { get; set; } = null!;
}