using TaskApi.Dtos;

namespace TaskApi.Services.IServices;

public interface ITaskItemService
{
    Task<TaskItemResponse> AddAsync(TaskItemCreationRequest item);
    Task<IEnumerable<TaskItemResponse>> GetAllAsync();
    Task<TaskItemResponse> GetTaskByIdAsync(int id);
    Task<TaskItemResponse> UpdateTask(int id, TaskItemUpdateRequest item);
    Task<bool> DeleteTask(int id);
}