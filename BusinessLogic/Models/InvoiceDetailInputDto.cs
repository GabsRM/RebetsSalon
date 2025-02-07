using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

public class InvoiceDetailInputDto
{
    /// <summary>
    /// Identificador del producto
    /// </summary>
    public string ProductId { get; set; } = null!;

    /// <summary>
    /// Cantidad de producto
    /// </summary>
    public int Quantity { get; set; }
}