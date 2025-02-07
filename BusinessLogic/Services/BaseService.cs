using BusinessLogic.Helpers;
using BusinessLogic.Interfaces;
using DataAccess.Context;

namespace BusinessLogic.Service;

public abstract class BaseService<T, Z> : IBaseService<T, Z>
{
    protected readonly InwentContext _dbContext;

    public BaseService(InwentContext db) => _dbContext = db;

    public abstract Task<BaseResult> Create(Z model);

    public abstract Task<Result<List<T>>> Get();

    public abstract Task<Result<T>> Get(string id);

    public abstract Task<BaseResult> Delete(string id);

    public abstract Task<BaseResult> Update(string id, Z model);
}