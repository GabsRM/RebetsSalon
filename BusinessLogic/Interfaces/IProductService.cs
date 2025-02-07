using BusinessLogic.Helpers;
using BusinessLogic.Models;

namespace BusinessLogic.Interfaces;

public interface IProductService : IBaseService<ProductDto, ProductInputDto> 
{
  public Task<Result<List<ProductDto>>> GetByType(string type);

  public Task<Result<List<ProductAvailableDto>>> GetAvailable();
}