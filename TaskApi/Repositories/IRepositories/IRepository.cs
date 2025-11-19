using System.Linq.Expressions;

namespace TaskApi.Repositories.IRepositories;

public interface IRepository<T> where T: class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<IReadOnlyCollection<T>> GetAllAsync(Expression<Func<T, bool>> predicate=null);
    Task<bool> CreateAsync(T item);
    Task<bool> UpdateAsync(T item);
    Task<bool> DeleteAsync(int id);
    Task<int> SaveChangesAsync();
}