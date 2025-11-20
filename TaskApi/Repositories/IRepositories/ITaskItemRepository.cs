using TaskApi.Dtos;
using TaskApi.Models;

namespace TaskApi.Repositories.IRepositories;

public interface ITaskItemRepository: IRepository<TaskItem>
{
    public Task<List<TaskItem>> GetTaskItemsByStatus(string status);
}