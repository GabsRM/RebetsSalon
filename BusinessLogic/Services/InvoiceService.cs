
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Service;

public class InvoiceService : BaseService<InvoiceDto, InvoiceInputDto>
{
    private readonly SessionService _session;
    private Dictionary<string, string> TypeProduct = new(){
        { "S", "Servicio" },
        { "I", "Producto" }
    };

    public InvoiceService(InwentContext db, SessionService session) : base(db)
    {
        _session = session;
    }

    public override async Task<BaseResult> Create(InvoiceInputDto model)
    {
        try
        {
            var branchId = _session.BranchId;

            if (string.IsNullOrEmpty(branchId))
                return new(Message.Error.BRANCH_NOT_FOUND);

            var exchangeRate = _dbContext.HistoricalExchangeRate.OrderByDescending(x => x.Date).FirstOrDefault();

            if (exchangeRate is null)
                return new(Message.Error.EXCHANGE_RATE_NOT_FOUND);

            var branch = _dbContext.Branch.Find(branchId);

            if (branch is null || !branch.Active)
                return new(Message.Error.BRANCH_IS_INACTIVATED);

            var consecutive = await _dbContext.Consecutive.FindAsync("Inv");

            if (consecutive is null)
            {
                consecutive = new()
                {
                    Consecutive1 = "00001",
                    Length = 5,
                    ConsecutiveId = "Inv",
                    Mask = "99999"
                };

                _dbContext.Entry(consecutive).State = EntityState.Added;
                await _dbContext.SaveChangesAsync();
            }

            var products = await _dbContext.Product.Where(x => model.Details.Select(x => x.ProductId).Contains(x.ProductId)).Select(x => new { x.ProductId, x.Price }).ToListAsync();

            var details = (from p in products
                           join d in model.Details on p.ProductId equals d.ProductId
                           select new InvoiceDetail
                           {
                               UnitPrice = p.Price,
                               ProductId = p.ProductId,
                               Quantity = model.Details.First(x => x.ProductId.Equals(p.ProductId)).Quantity
                           }).ToList();

            var invoice = new Invoice
            {
                Active = true,
                InvoiceId = consecutive.Consecutive1,
                Date = DateTime.Now,
                BranchId = branchId,
                Discount = model.Discount,
                Subtotal = details.Sum(x => x.UnitPrice * x.Quantity),
                InvoiceDetail = details,
                HistoricalExchangeRateId = exchangeRate.HistoricalExchangeRateId
            };

            _dbContext.Add(invoice);

            var inventories = await _dbContext.Inventory.Where(x => x.BranchId.Equals(branchId)).Select(x => new
            {
                x.InventoryId,
                x.BranchId,
                x.ProductId,
                x.Stock
            }).ToListAsync();

            var updateInventories = (from i in inventories
                                     join d in model.Details on i.ProductId equals d.ProductId
                                     select new Inventory
                                     {
                                         InventoryId = i.InventoryId,
                                         BranchId = i.BranchId,
                                         ProductId = i.ProductId,
                                         Stock = i.Stock - d.Quantity
                                     }).ToList();

            _dbContext.UpdateRange(updateInventories);

            ConsecutiveGenerator.GenerateConsecutive(consecutive);

            _dbContext.Update(consecutive);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_CREATED_SUCESSFULLY_BY_ID.Replace(Message.VariableNames.Id, invoice.InvoiceId), true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Delete(string id)
    {
        try
        {
            var invoice = await _dbContext.Invoice.FindAsync(id);

            if (invoice is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            var details = await (from pd in _dbContext.InvoiceDetail
                                 join i in _dbContext.Inventory on new { pd.Invoice.BranchId, pd.ProductId } equals new { i.BranchId, i.ProductId }
                                 where pd.InvoiceId.Equals(id)
                                 select new
                                 {
                                     pd,
                                     i,
                                 }).ToListAsync();

            foreach (var detail in details)
            {
                var line = detail.pd;
                var inventory = detail.i;

                inventory.Stock -= line.Quantity;

                _dbContext.Update(inventory);
            }

            invoice.Active = false;

            _dbContext.Update(invoice);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_INACTIVATE_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<InvoiceDto>>> Get()
    {
        try
        {
            var purchases = await (from i in _dbContext.Invoice
                                   select new InvoiceDto()
                                   {
                                       Date = i.Date,
                                       Discount = i.Discount,
                                       Subtotal = i.Subtotal,
                                       Tax = i.Tax,
                                       InvoiceId = i.InvoiceId,
                                       Active = i.Active,
                                       Total = i.Total ?? i.Subtotal - i.Discount + i.Tax,

                                       Details = i.InvoiceDetail.Select(x => new InvoiceDetailDto
                                       {
                                           Description = x.Product.Description,
                                           ProductId = x.ProductId,
                                           Quantity = x.Quantity,
                                           Subtotal = x.Subtotal ?? x.Quantity * x.Product.Price,
                                           UnitPrice = x.UnitPrice
                                       }),
                                       Branch = new()
                                       {
                                           Address = i.Branch.Address,
                                           BranchId = i.Branch.BranchId,
                                           Name = i.Branch.Name,
                                           Phone = i.Branch.Phone
                                       }
                                   }).ToListAsync();

            if (purchases is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            return new(purchases);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<InvoiceDto>> Get(string id)
    {
        try
        {
            var purchase = await (from i in _dbContext.Invoice
                                  where i.InvoiceId.Equals(id)
                                  select new InvoiceDto()
                                  {
                                      Date = i.Date,
                                      Discount = i.Discount,
                                      Subtotal = i.Subtotal,
                                      Tax = i.Tax,
                                      InvoiceId = i.InvoiceId,
                                      Active = i.Active,
                                      Total = i.Total ?? i.Subtotal - i.Discount + i.Tax,

                                      Details = i.InvoiceDetail.Select(x => new InvoiceDetailDto
                                      {
                                          Description = x.Product.Description,
                                          ProductId = x.ProductId,
                                          Quantity = x.Quantity,
                                          Subtotal = x.Subtotal ?? x.Quantity * x.Product.Price,
                                          UnitPrice = x.UnitPrice
                                      }),
                                      Branch = new()
                                      {
                                          Address = i.Branch.Address,
                                          BranchId = i.Branch.BranchId,
                                          Name = i.Branch.Name,
                                          Phone = i.Branch.Phone
                                      }
                                  }).FirstOrDefaultAsync();

            if (purchase is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            return new(purchase);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override Task<BaseResult> Update(string id, InvoiceInputDto model)
    {
        throw new NotImplementedException();
    }

    public async Task<Result<List<InvoicePerMonth>>> GetInvoiceCount()
    {
        try
        {
            var invoicesPerMonth = await (from i in _dbContext.Invoice
                                          where i.Active
                                          group i by new { i.Date.Year, i.Date.Month } into g
                                          orderby g.Key.Year, g.Key.Month
                                          select new InvoicePerMonth(g.Key.Year, g.Key.Month, g.Count())).ToListAsync();

            return new(invoicesPerMonth);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<Result<List<InvoiceTypeCountPerMonth>>> GetInvoiceTypeCountInDate(DateTime? date)
    {
        try
        {
            var month = date?.Month ?? DateTime.Now.Month;
            var year = date?.Year ?? DateTime.Now.Year;

            var invoicesPerMonth = await (from i in _dbContext.Invoice
                                          join id in _dbContext.InvoiceDetail on i.InvoiceId equals id.InvoiceId
                                          where i.Date.Month == month && i.Date.Year == year && i.Active
                                          group new { i, id } by new { i.Date.Year, i.Date.Month, id.Product.Type } into g
                                          orderby g.Key.Year, g.Key.Month
                                          select new InvoiceTypeCountPerMonth(g.Key.Year, g.Key.Month, g.Sum(x => x.id.Quantity), TypeProduct.GetValueOrDefault(g.Key.Type) ?? g.Key.Type)).ToListAsync();

            return new(invoicesPerMonth);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<Result<List<BestSellingProduct>>> GetBestSellingProducts()
    {
        try
        {
            var bestSellingProducts = await (from p in _dbContext.Product
                                             let sales = p.InvoiceDetail.Where(x => x.Invoice.Active).Sum(x => x.Quantity)
                                             orderby sales descending
                                             select new BestSellingProduct(p.ProductId, p.Description, sales))
                                             .Take(5)
                                             .ToListAsync();

            return new(bestSellingProducts);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }
}