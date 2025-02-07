
using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using BusinessLogic.Models;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Service;

public class ProductService : BaseService<ProductDto, ProductInputDto>, IProductService
{
    private Dictionary<string, string> TypeProduct = new(){
        { "S", "Servicio" },
        { "I", "Producto" }
    };

    private readonly SessionService _session;

    public ProductService(InwentContext db, SessionService session) : base(db)
    {
        _session = session;
    }

    public override async Task<BaseResult> Create(ProductInputDto model)
    {
        try
        {
            var categories = await _dbContext.Category.Where(x => model.Categories.Contains(x.CategoryId)).ToListAsync();

            if (categories.Count() != model.Categories.Count())
                return new(Message.Error.SOME_CATEGORY_NOT_FOUND);

            var consecutive = model.Type.Equals("S") ? await _dbContext.Consecutive.FindAsync("Serv") : await _dbContext.Consecutive.FindAsync("Prod");

            if (consecutive is null)
            {
                consecutive = model.Type.Equals("S") ?
                new()
                {
                    Consecutive1 = "S0001",
                    ConsecutiveId = "Serv",
                    Length = 5,
                    Mask = "A9999"
                } :
                new()
                {
                    Consecutive1 = "P0001",
                    Length = 5,
                    ConsecutiveId = "Prod",
                    Mask = "A9999"
                };

                _dbContext.Entry(consecutive).State = EntityState.Added;
                await _dbContext.SaveChangesAsync();
            }

            var product = new Product()
            {
                ProductId = consecutive.Consecutive1,
                Description = model.Description,
                MinStock = model.MinStock,
                PhotoUri = model.PhotoUri,
                Barcode = model.Barcode,
                Price = model.Price,
                Type = model.Type,
                Active = true,
                Category = categories
            };

            _dbContext.Add(product);

            ConsecutiveGenerator.GenerateConsecutive(consecutive);

            _dbContext.Update(consecutive);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_CREATED_SUCESSFULLY_BY_ID.Replace(Message.VariableNames.Id, consecutive.Consecutive1), true);
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
            var product = await _dbContext.Product.FindAsync(id);

            if (product is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            product.Active = false;

            _dbContext.Update(product);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_INACTIVATE_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<ProductDto>>> Get()
    {
        try
        {
            var branchId = _session.BranchId;
            var products = await (from p in _dbContext.Product
                                  where p.Active
                                  let td = TypeProduct.GetValueOrDefault(p.Type)
                                  let ts = p.Inventory.Where(i => i.Branch.Active).Sum(i => i.Stock)
                                  let ls = p.Inventory.Where(i => i.BranchId.Equals(branchId)).Sum(i => i.Stock)
                                  let c = p.Category.Select(c => c.Name)
                                  let ppb = p.Inventory.Where(i => i.Branch.Active).Select(i => new ProductBranchDto()
                                  {
                                      BranchId = i.BranchId,
                                      Name = i.Branch.Name,
                                      Stock = i.Stock
                                  })
                                  select new ProductDto()
                                  {
                                      ProductId = p.ProductId,
                                      Description = p.Description,
                                      MinStock = p.MinStock,
                                      Barcode = p.Barcode,
                                      Price = p.Price,
                                      Type = td,
                                      Categories = c,
                                      TotalStock = ts,
                                      LocalStock = ls,
                                      ProductPerBranch = ppb
                                  }).ToListAsync();

            return new(products);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<ProductDto>> Get(string id)
    {
        try
        {
            var branchId = _session.BranchId;
            var product = await (from p in _dbContext.Product
                                 where p.ProductId.Equals(id) && p.Active
                                 let td = TypeProduct.GetValueOrDefault(p.Type)
                                 let ts = p.Inventory.Where(i => i.Branch.Active).Sum(i => i.Stock)
                                 let ls = p.Inventory.Where(i => i.BranchId.Equals(branchId)).Sum(i => i.Stock)
                                 let c = p.Category.Select(c => c.Name)
                                 let ppb = p.Inventory.Where(i => i.Branch.Active).Select(i => new ProductBranchDto()
                                 {
                                     BranchId = i.BranchId,
                                     Name = i.Branch.Name,
                                     Stock = i.Stock
                                 })
                                 select new ProductDto()
                                 {
                                     ProductId = p.ProductId,
                                     Description = p.Description,
                                     MinStock = p.MinStock,
                                     Barcode = p.Barcode,
                                     Price = p.Price,
                                     Type = td,
                                     Categories = c,
                                     TotalStock = ts,
                                     LocalStock = ls,
                                     ProductPerBranch = ppb
                                 }).FirstOrDefaultAsync();

            if (product is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            return new(product);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Update(string id, ProductInputDto model)
    {
        try
        {

            var product = await _dbContext.Product.Include(x => x.Category).FirstOrDefaultAsync(x => x.ProductId.Equals(id));

            if (product is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            var categories = await _dbContext.Category.Where(x => model.Categories.Contains(x.CategoryId) && !product.Category.Select(x => x.CategoryId).Contains(x.CategoryId)).ToListAsync();

            product.Barcode = model.Barcode;
            product.Description = model.Description;
            product.MinStock = model.MinStock;
            product.PhotoUri = model.PhotoUri;
            product.Price = model.Price;
            product.Type = model.Type;
            product.Category = categories;

            _dbContext.Update(product);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<Result<List<ProductDto>>> GetByType(string type)
    {
        try
        {
            var branchId = _session.BranchId;
            var products = await (from p in _dbContext.Product
                                  where p.Active && p.Type.Equals(type)
                                  let td = TypeProduct.GetValueOrDefault(p.Type)
                                  let ts = p.Inventory.Where(i => i.Branch.Active).Sum(i => i.Stock)
                                  let ls = p.Inventory.Where(i => i.BranchId.Equals(branchId)).Sum(i => i.Stock)
                                  let c = p.Category.Select(c => c.Name)
                                  let ppb = p.Inventory.Where(i => i.Branch.Active).Select(i => new ProductBranchDto()
                                  {
                                      BranchId = i.BranchId,
                                      Name = i.Branch.Name,
                                      Stock = i.Stock
                                  })
                                  select new ProductDto()
                                  {
                                      ProductId = p.ProductId,
                                      Description = p.Description,
                                      MinStock = p.MinStock,
                                      Barcode = p.Barcode,
                                      Price = p.Price,
                                      Type = td,
                                      Categories = c,
                                      TotalStock = ts,
                                      LocalStock = ls,
                                      ProductPerBranch = ppb
                                  }).ToListAsync();

            return new(products);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<Result<List<ProductAvailableDto>>> GetAvailable()
    {
        try
        {
            var branchId = _session.BranchId;

            if (string.IsNullOrEmpty(branchId))
                return new(Message.Error.BRANCH_NOT_FOUND);

            var products = await (from p in _dbContext.Product
                                  where p.Active
                                  let td = TypeProduct.GetValueOrDefault(p.Type)
                                  let ls = p.Inventory.Where(i => i.BranchId.Equals(branchId)).Sum(i => i.Stock)
                                  where ls > 0 || p.Type.Equals("S")
                                  select new ProductAvailableDto()
                                  {
                                      ProductId = p.ProductId,
                                      Description = p.Description,
                                      Barcode = p.Barcode,
                                      Price = p.Price,
                                      Type = td,
                                      Stock = ls
                                  }).ToListAsync();

            return new(products);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }
}