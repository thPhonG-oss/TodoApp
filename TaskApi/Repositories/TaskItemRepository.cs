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
}