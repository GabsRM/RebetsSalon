
namespace BusinessLogic.Models;

public class BranchProductDto
{
   /// <summary>
    /// Identificador único del producto
    /// </summary>
    public string ProductId { get; set; } = null!;

    /// <summary>
    /// Descripción del producto
    /// </summary>
    public string Description { get; set; } = null!;

    /// <summary>
    /// Existencias del producto en la sucursal
    /// </summary>
    public int Stock { get; set; }    
}