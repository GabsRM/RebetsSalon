
namespace BusinessLogic.Models;

/// <summary>
/// Tabla de sucursales del sistema
/// </summary>
public partial class BranchDto
{
    /// <summary>
    /// Identificador único de la sucursal
    /// </summary>
    public string BranchId { get; set; } = null!;

    /// <summary>
    /// Nombre de la sucursal
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Dirección de la sucursal
    /// </summary>
    public string? Address { get; set; }

    /// <summary>
    /// Número de teléfono de la sucursal
    /// </summary>
    public string? Phone { get; set; }

    public IEnumerable<BranchProductDto> ProductsInBranch { get; set; } = null!;
}
