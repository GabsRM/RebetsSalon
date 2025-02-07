using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Models;

/// <summary>
/// Tabla de tasa de cambio histórico por moneda
/// </summary>
public partial class HistoricalExchangeRate
{
    /// <summary>
    /// Identificador único de registro histórico de tasa de cambio
    /// </summary>
    [Key]
    public int HistoricalExchangeRateId { get; set; }

    /// <summary>
    /// Fecha de tipo de cambio
    /// </summary>
    [Column(TypeName = "date")]
    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18, 4)")]
    public decimal ExchangeRate { get; set; }

    [InverseProperty("HistoricalExchangeRate")]
    public virtual ICollection<Invoice> Invoice { get; set; } = new List<Invoice>();
}
