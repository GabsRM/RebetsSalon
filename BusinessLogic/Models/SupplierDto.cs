
namespace BusinessLogic.Models;

/// <summary>
/// Tabla de proveedores del sistema
/// </summary>
public partial class SupplierDto
{
    /// <summary>
    /// Identificador del proveedor
    /// </summary>
    public string SupplierId { get; set; } = null!;

    /// <summary>
    /// Nombre del proveedor
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Número telefónico del proveedor
    /// </summary>
    public string? Phone { get; set; }

    /// <summary>
    /// Dirección del proveedor
    /// </summary>
    public string Address { get; set; } = null!;

    /// <summary>
    /// Correo electrónico del proveedor
    /// </summary>
    public string Email { get; set; } = null!;
}
