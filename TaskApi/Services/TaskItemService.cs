using AutoMapper;
using TaskApi.Dtos;
using TaskApi.Models;
using TaskApi.Repositories.IRepositories;
using TaskApi.Services.IServices;

namespace TaskApi.Services;

public class TaskItemService : ITaskItemService
{
    private readonly ITaskItemRepository _repo;
    private readonly IMapper _mapper;

    public TaskItemService(ITaskItemRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    public async Task<TaskItemResponse> AddAsync(TaskItemCreationRequest request)
    {
        TaskItem item = new TaskItem()
        {
            Title = request.Title,
            Description = request.Description,
            DueDate = request.DueDate,
            CreatedOn = DateTime.UtcNow,
            LastModifiedOn = DateTime.UtcNow
        };

        await _repo.CreateAsync(item);
        await _repo.SaveChangesAsync();

        return _mapper.Map<TaskItemResponse>(item);
    }

    public async Task<TaskItemResponse> GetTaskByIdAsync(int id)
    {
        var item = await _repo.GetByIdAsync(id);
        if(item == null) return null;
        
        return _mapper.Map<TaskItemResponse>(item);
    }

    public async Task<IEnumerable<TaskItemResponse>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();
        return _mapper.Map<IEnumerable<TaskItemResponse>>(items); 
    }

    public async Task<TaskItemResponse> UpdateTask(int id, TaskItemUpdateRequest item)
    {
        if (await _repo.GetByIdAsync(id) == null)
        {
            throw new Exception("Task not found");
        }
        else
        {
            TaskItem existingTask = await _repo.GetByIdAsync(id);
            
            existingTask.Title = item.Title;
            existingTask.Description = item.Description;
            existingTask.DueDate = item.DueDate;
            existingTask.Status = item.Status;
            existingTask.LastModifiedOn = DateTime.UtcNow;
            
            _repo.Update(existingTask);

            int affectdRows = await _repo.SaveChangesAsync();

            if (affectdRows > 0)
            {
                return await GetTaskByIdAsync(id);
            }
            else
            {
                return null;
            }
        }
    }

    public async Task<bool> DeleteTask(int id)
    {
        TaskItem existingItem = await _repo.GetByIdAsync(id);

        if (existingItem == null)
        {
            return false;
        }
        else
        {
            _repo.Delete(existingItem);
        }
        
        int effectedRows = await _repo.SaveChangesAsync();
        return effectedRows > 0;
    }
}