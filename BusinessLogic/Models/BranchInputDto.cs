using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

/// <summary>
/// Tabla de sucursales del sistema
/// </summary>
public partial class BranchInputDto
{
    /// <summary>
    /// Nombre de la sucursal
    /// </summary>
    [StringLength(100, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Name { get; set; } = null!;

    /// <summary>
    /// Dirección de la sucursal
    /// </summary>
    [StringLength(200, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string? Address { get; set; }

    /// <summary>
    /// Número de teléfono de la sucursal
    /// </summary>
    [StringLength(15, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string? Phone { get; set; }
}
