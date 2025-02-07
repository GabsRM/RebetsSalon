
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Service;

public class SupplierService : BaseService<SupplierDto, SupplierInputDto>
{
    public SupplierService(InwentContext db) : base(db) { }

    public override async Task<BaseResult> Create(SupplierInputDto model)
    {
        try
        {
            var consecutive = await _dbContext.Consecutive.FindAsync("Sups");

            if (consecutive is null)
            {
                consecutive = new()
                {
                    Consecutive1 = "SP001",
                    Length = 5,
                    ConsecutiveId = "Sups",
                    Mask = "AA999"
                };

                _dbContext.Entry(consecutive).State = EntityState.Added;
                await _dbContext.SaveChangesAsync();
            }

            Supplier supplier = new()
            {
                SupplierId = consecutive.Consecutive1,
                Address = model.Address,
                Phone = model.Phone,
                Name = model.Name,
                Email = model.Email, 
                Active = true
            };

            _dbContext.Add(supplier);

            ConsecutiveGenerator.GenerateConsecutive(consecutive);

            _dbContext.Update(consecutive);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_CREATED_SUCESSFULLY_BY_ID.Replace(Message.VariableNames.Id, supplier.SupplierId), true);
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
            var supplier = await _dbContext.Supplier.FindAsync(id);

            if (supplier is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            supplier.Active = false;

            _dbContext.Update(supplier);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_INACTIVATE_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<SupplierDto>>> Get()
    {
        try
        {
            var supplier = await (from s in _dbContext.Supplier
                                  where s.Active
                                  select new SupplierDto()
                                  {
                                      SupplierId = s.SupplierId,
                                      Address = s.Address,
                                      Name = s.Name,
                                      Phone = s.Phone,
                                      Email = s.Email
                                  }).ToListAsync();

            return new(supplier);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<SupplierDto>> Get(string id)
    {
        try
        {
            var supplier = await (from s in _dbContext.Supplier
                                  where s.Active && s.SupplierId.Equals(id)
                                  select new SupplierDto()
                                  {
                                      SupplierId = s.SupplierId,
                                      Address = s.Address,
                                      Name = s.Name,
                                      Phone = s.Name,
                                      Email = s.Email
                                  }).FirstOrDefaultAsync();

            if (supplier is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            return new(supplier);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Update(string id, SupplierInputDto model)
    {
        try
        {
            var supplier = await _dbContext.Supplier.FindAsync(id);

            if (supplier is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            supplier.Address = model.Address;
            supplier.Name = model.Name;
            supplier.Phone = model.Phone;
            supplier.Email = model.Email;

            _dbContext.Update(supplier);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }
}