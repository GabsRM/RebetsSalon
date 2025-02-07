
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Service;

public class BranchService : BaseService<BranchDto, BranchInputDto>
{
    public BranchService(InwentContext db) : base(db) { }

    public override async Task<BaseResult> Create(BranchInputDto model)
    {
        try
        {
            var consecutive = await _dbContext.Consecutive.FindAsync("Brnch");

            if (consecutive is null)
            {
                consecutive = new()
                {
                    Consecutive1 = "BR001",
                    Length = 5,
                    ConsecutiveId = "Brnch",
                    Mask = "AA999"
                };

                _dbContext.Entry(consecutive).State = EntityState.Added;
                await _dbContext.SaveChangesAsync();
            }

            Branch branch = new()
            {
                BranchId = consecutive.Consecutive1,
                Address = model.Address,
                Active = true,
                Phone = model.Phone,
                Name = model.Name,
            };

            _dbContext.Add(branch);

            ConsecutiveGenerator.GenerateConsecutive(consecutive);

            _dbContext.Update(consecutive);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_CREATED_SUCESSFULLY_BY_ID.Replace(Message.VariableNames.Id, branch.BranchId), true);
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
            var branch = await _dbContext.Branch.FindAsync(id);

            if (branch is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            branch.Active = false;

            _dbContext.Update(branch);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_INACTIVATE_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<BranchDto>>> Get()
    {
        try
        {
            var branch = await (from b in _dbContext.Branch
                                where b.Active
                                select new BranchDto()
                                {
                                    BranchId = b.BranchId,
                                    Address = b.Address,
                                    Name = b.Name,
                                    Phone = b.Phone,
                                    ProductsInBranch = b.Inventory.Select(x => new BranchProductDto()
                                    {
                                        Description = x.Product.Description,
                                        ProductId = x.ProductId,
                                        Stock = x.Stock
                                    })
                                }).ToListAsync();

            return new(branch);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<BranchDto>> Get(string id)
    {
        try
        {
            var branch = await (from b in _dbContext.Branch
                                where b.Active && b.BranchId.Equals(id)
                                select new BranchDto()
                                {
                                    BranchId = b.BranchId,
                                    Address = b.Address,
                                    Name = b.Name,
                                    Phone = b.Phone,
                                    ProductsInBranch = b.Inventory.Select(x => new BranchProductDto()
                                    {
                                        Description = x.Product.Description,
                                        ProductId = x.ProductId,
                                        Stock = x.Stock
                                    })
                                }).FirstOrDefaultAsync();

            if (branch is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            return new(branch);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Update(string id, BranchInputDto model)
    {
        try
        {
            var branch = await _dbContext.Branch.FindAsync(id);

            if (branch is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            branch.Address = model.Address;
            branch.Name = model.Name;
            branch.Phone = model.Phone;

            _dbContext.Update(branch);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }
}