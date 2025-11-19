using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Dtos;
using TaskApi.Models;
using TaskApi.Repositories.IRepositories;

namespace TaskApi.Repositories;

public class TaskItemRepository : ITaskItemRepository
{
    private readonly ILogger<TaskItemRepository> _logger;
    private readonly AppDbContext _dbContext;

    public TaskItemRepository(AppDbContext dbContext, ILogger<TaskItemRepository> logger)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    public async Task<TaskItem?> GetByIdAsync(int id)
    {
        return await _dbContext.TaskItems.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<TaskItem>> GetAllAsync()
    {
        return await _dbContext.TaskItems.OrderByDescending(t => t.Id).ToListAsync();
    }

    public async Task<TaskItem?> CreateAsync(TaskItem item)
    {
        _dbContext.TaskItems.AddAsync(item);
        await _dbContext.SaveChangesAsync();
        return item;
    }

    public void Update(TaskItem item) => _dbContext.TaskItems.Update(item);
    
    public void Delete(TaskItem item) => _dbContext.TaskItems.Remove(item);
    
    public async Task<int> SaveChangesAsync() => await  _dbContext.SaveChangesAsync();
}