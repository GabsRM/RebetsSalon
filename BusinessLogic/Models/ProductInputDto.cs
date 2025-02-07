using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

public partial class ProductInputDto
{
    /// <summary>
    /// Breve descripción del producto
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [StringLength(200, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Description { get; set; } = null!;

    /// <summary>
    /// Tipo de producto. I - Artículo | S - Servicio
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [StringLength(1, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    [RegularExpression("S|I", ErrorMessage = Message.Error.INCORRECT_PRODUCT_TYPE)]
    public string Type { get; set; } = null!;

    /// <summary>
    /// Código de barra asociado a este producto
    /// </summary>
    [StringLength(100, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string? Barcode { get; set; }

    /// <summary>
    /// Precio actual del producto
    /// </summary>
    [Column(TypeName = "decimal(18, 4)")]
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [Range(0.01, double.MaxValue, ErrorMessage = Message.Error.INVALID_RANGE_NUMBER)]
    public decimal Price { get; set; }

    /// <summary>
    /// Existencias mínimas del producto
    /// </summary>
    public int? MinStock { get; set; }

    /// <summary>
    /// Dirección de la imagen del producto
    /// </summary>
    [StringLength(100)]
    public string? PhotoUri { get; set; }

    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    public IEnumerable<int> Categories { get; set; } = null!;
}
