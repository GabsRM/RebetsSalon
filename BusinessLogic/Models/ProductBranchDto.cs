using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Models;

public class ProductBranchDto
{
   /// <summary>
    /// Identificador único de la sucursal
    /// </summary>
    [StringLength(5)]
    public string BranchId { get; set; } = null!;

    /// <summary>
    /// Nombre de la sucursal
    /// </summary>
    [StringLength(100)]
    public string Name { get; set; } = null!;

    public int Stock { get; set; }    
}