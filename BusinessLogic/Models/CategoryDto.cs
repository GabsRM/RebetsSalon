using System.ComponentModel.DataAnnotations;

namespace BusinessLogic.Models;

public class CategoryDto
{
    /// <summary>
    /// Identificador de categoría de producto
    /// </summary>
    public int CategoryId { get; set; }

    /// <summary>
    /// Nombre de la categoría
    /// </summary>
    [StringLength(100)]
    public string Name { get; set; } = null!;

    /// <summary>
    /// Breve descripción de la categoría de producto
    /// </summary>
    [StringLength(100)]
    public string Description { get; set; } = null!;
}