using BusinessLogic.Helpers;
using DataAccess.Context;

namespace BusinessLogic.Interfaces;

public interface IBaseService<T, Z>
{
    public Task<BaseResult> Create(Z model);

    public Task<Result<List<T>>> Get();

    public Task<Result<T>> Get(string id);

    public Task<BaseResult> Delete(string id);

    public Task<BaseResult> Update(string id, Z model);
}