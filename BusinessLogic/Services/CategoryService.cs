
using BusinessLogic.Helpers;
using BusinessLogic.Models;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Service;

public class CategoryService : BaseService<CategoryDto, CategoryInputDto>
{
    public CategoryService(InwentContext db) : base(db) { }

    public override async Task<BaseResult> Create(CategoryInputDto model)
    {
        try
        {
            Category category = new()
            {
                Description = model.Description,
                Name = model.Name,
            };

            _dbContext.Add(category);

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_CREATED_SUCESSFULLY_BY_ID.Replace(Message.VariableNames.Id, category.CategoryId.ToString().PadLeft(5, '0')), true);
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
            var category = await _dbContext.Category.Include(x => x.Product).FirstOrDefaultAsync(x => x.CategoryId.ToString().Equals(id));

            if (category is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);
            
            _dbContext.Remove(category);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_DELETED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<CategoryDto>>> Get()
    {
        try
        {
            var categories = await (from c in _dbContext.Category
                                    select new CategoryDto()
                                    {
                                        CategoryId = c.CategoryId,
                                        Name = c.Name,
                                        Description = c.Description
                                    }).ToListAsync();

            return new(categories);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<CategoryDto>> Get(string id)
    {
        try
        {
            var category = await (from c in _dbContext.Category
                                  where c.CategoryId.ToString() == id
                                  select new CategoryDto()
                                  {
                                      CategoryId = c.CategoryId,
                                      Name = c.Name,
                                      Description = c.Description
                                  }).FirstOrDefaultAsync();

            if (category is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            return new(category);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Update(string id, CategoryInputDto model)
    {
        try
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(x => x.CategoryId.ToString().Equals(id));

            if (category is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            category.Description = model.Description;
            category.Name = model.Name;

            _dbContext.Update(category);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.DOCUMENT_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }
}