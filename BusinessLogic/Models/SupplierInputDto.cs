
using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

/// <summary>
/// Tabla de proveedores del sistema
/// </summary>
public partial class SupplierInputDto
{
    /// <summary>
    /// Nombre del proveedor
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [StringLength(100, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Name { get; set; } = null!;

    /// <summary>
    /// Número telefónico del proveedor
    /// </summary>
    [StringLength(15, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string? Phone { get; set; }

    /// <summary>
    /// Dirección del proveedor
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [StringLength(200, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Address { get; set; } = null!;

    /// <summary>
    /// Correo electrónico del proveedor
    /// </summary>
    [Required(ErrorMessage = Message.Error.FIELD_REQUIRED)]
    [StringLength(100, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Email { get; set; } = null!;
}
