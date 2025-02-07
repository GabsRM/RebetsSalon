using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

public class CategoryInputDto
{
    /// <summary>
    /// Nombre de la categoría
    /// </summary>
    [StringLength(100, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Name { get; set; } = null!;

    /// <summary>
    /// Breve descripción de la categoría de producto
    /// </summary>
    [StringLength(100, ErrorMessage = Message.Error.MAX_LENGTH_OVERRUN)]
    public string Description { get; set; } = null!;
}