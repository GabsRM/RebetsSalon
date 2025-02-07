using BusinessLogic.Helpers;
using BusinessLogic.Models;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Service;

public class PurchaseService : BaseService<PurchaseDto, PurchaseInputDto>
{
    public PurchaseService(InwentContext db) : base(db) { }

    public override async Task<BaseResult> Create(PurchaseInputDto model)
    {
        try
        {
            var consecutive = await _dbContext.Consecutive.FindAsync("Purch");

            if (consecutive is null)
            {
                consecutive = new()
                {
                    Consecutive1 = "C0001",
                    Length = 5,
                    ConsecutiveId = "Purch",
                    Mask = "A9999"
                };

                _dbContext.Add(consecutive);
                await _dbContext.SaveChangesAsync();
            }

            Purchase purchase = new()
            {
                PurchaseId = consecutive.Consecutive1,
                Active = true,
                BranchId = model.BranchId,
                Date = model.Date,
                Discount = model.Discount,
                Tax = model.Tax,
                SupplierId = model.SupplierId,
                SupplierInvoiceId = model.SupplierInvoiceId,
                Subtotal = model.Subtotal,
                PurchaseDetail = model.Detail.Select(x => new PurchaseDetail()
                {
                    ProductId = x.ProductId,
                    Quantity = x.Quantity,
                    UnitCost = x.UnitCost,
                    SuggestedRetailPrice = x.SuggestedRetailPrice,
                }).ToList()
            };

            foreach (var item in purchase.PurchaseDetail)
            {
                var inventory = await _dbContext.Inventory.FirstOrDefaultAsync(x => x.ProductId.Equals(item.ProductId) && x.BranchId.Equals(purchase.BranchId));

                if (inventory is null)
                {
                    inventory = new()
                    {
                        BranchId = purchase.BranchId,
                        ProductId = item.ProductId,
                        Stock = item.Quantity,
                    };

                    _dbContext.Add(inventory);
                }
                else
                {
                    inventory.Stock += item.Quantity;
                    _dbContext.Update(inventory);
                }
            }

            _dbContext.Add(purchase);

            ConsecutiveGenerator.GenerateConsecutive(consecutive);

            _dbContext.Update(consecutive);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_CREATED_SUCESSFULLY_BY_ID.Replace(Message.VariableNames.Id, purchase.PurchaseId), true);
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
            var purchase = await _dbContext.Purchase.FindAsync(id);

            if (purchase is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            var details = await (from pd in _dbContext.PurchaseDetail
                                 join i in _dbContext.Inventory on new { pd.Purchase.BranchId, pd.ProductId } equals new { i.BranchId, i.ProductId }
                                 where pd.PurchaseId.Equals(id)
                                 select new
                                 {
                                     pd,
                                     i,
                                 }).ToListAsync();

            foreach (var detail in details)
            {
                var line = detail.pd;
                var inventory = detail.i;

                if (inventory.Stock < line.Quantity)
                    return new(Message.Error.PURCHASE_OUT_STOCK);

                inventory.Stock -= line.Quantity;

                _dbContext.Update(inventory);
            }

            purchase.Active = false;

            _dbContext.Update(purchase);


            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_INACTIVATE_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<PurchaseDto>>> Get()
    {
        try
        {
            var purchases = await (from p in _dbContext.Purchase
                                   select new PurchaseDto()
                                   {
                                       Date = p.Date,
                                       Discount = p.Discount,
                                       Subtotal = p.Subtotal,
                                       Tax = p.Tax,
                                       PurchaseId = p.PurchaseId,
                                       Active = p.Active,
                                       SupplierInvoiceId = p.SupplierInvoiceId,
                                       Supplier = new()
                                       {
                                           SupplierId = p.Supplier.SupplierId,
                                           Address = p.Supplier.Address,
                                           Email = p.Supplier.Email,
                                           Name = p.Supplier.Name,
                                           Phone = p.Supplier.Phone
                                       },
                                       Detail = p.PurchaseDetail.Select(x => new PurchaseDetailDto()
                                       {
                                           Description = x.Product.Description,
                                           ProductId = x.ProductId,
                                           Quantity = x.Quantity,
                                           SuggestedRetailPrice = x.SuggestedRetailPrice,
                                           UnitCost = x.UnitCost
                                       })
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

    public override async Task<Result<PurchaseDto>> Get(string id)
    {
        try
        {
            var purchase = await (from p in _dbContext.Purchase
                                  where p.PurchaseId.Equals(id)
                                  select new PurchaseDto()
                                  {
                                      Date = p.Date,
                                      Discount = p.Discount,
                                      Subtotal = p.Subtotal,
                                      Tax = p.Tax,
                                      Active = p.Active,
                                      PurchaseId = p.PurchaseId,
                                      SupplierInvoiceId = p.SupplierInvoiceId,
                                      Supplier = new()
                                      {
                                          SupplierId = p.Supplier.SupplierId,
                                          Address = p.Supplier.Address,
                                          Email = p.Supplier.Email,
                                          Name = p.Supplier.Name,
                                          Phone = p.Supplier.Phone
                                      },
                                      Detail = p.PurchaseDetail.Select(x => new PurchaseDetailDto()
                                      {
                                          Description = x.Product.Description,
                                          ProductId = x.ProductId,
                                          Quantity = x.Quantity,
                                          SuggestedRetailPrice = x.SuggestedRetailPrice,
                                          UnitCost = x.UnitCost
                                      })
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

    public override Task<BaseResult> Update(string id, PurchaseInputDto model)
    {
        throw new NotImplementedException();
    }
}