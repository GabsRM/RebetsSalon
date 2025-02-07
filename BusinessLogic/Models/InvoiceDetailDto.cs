using System.ComponentModel.DataAnnotations;
using BusinessLogic.Helpers;

namespace BusinessLogic.Models;

/// <summary>
/// Tabla de detalle de una factura
/// </summary>
public class InvoiceDetailDto
{
    /// <summary>
    /// Identificador del producto
    /// </summary>
    public string ProductId { get; set; } = null!;

    /// <summary>
    /// Breve descripción del producto
    /// </summary>
    public string Description { get; set; } = null!;

    /// <summary>
    /// Cantidad de producto
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// Precio unitario del producto
    /// </summary>
    public decimal UnitPrice { get; set; }

    /// <summary>
    /// Cantidad a pagar por la cantidad de este producto en esta compra
    /// </summary>
    public decimal Subtotal { get; set; }
}