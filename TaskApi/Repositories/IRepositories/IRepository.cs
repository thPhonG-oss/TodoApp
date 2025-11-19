using System.Linq.Expressions;

namespace TaskApi.Repositories.IRepositories;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T?> CreateAsync(T item);
    void Update(T item);
    void Delete(T item);
    Task<int> SaveChangesAsync();
}