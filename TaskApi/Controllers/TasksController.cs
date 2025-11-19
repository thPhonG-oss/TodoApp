using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using TaskApi.Dtos;
using TaskApi.Repositories.IRepositories;
using TaskApi.Services.IServices;

namespace TaskApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskItemService _service;
    
    public TasksController(ITaskItemService service) => _service = service;

    [HttpGet("{id}", Name = "GetTaskById")]
    public async Task<ActionResult<TaskItemResponse>> GetTaskById(int id)
    {
        try
        {
            var response = await _service.GetTaskByIdAsync(id);
            
            if(response == null) return NotFound();
            
            return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpPost]
    public async Task<ActionResult<TaskItemResponse>> CreateNewTask([FromBody] TaskItemCreationRequest item)
    {
        try
        {
            var response = await _service.AddAsync(item);

            return CreatedAtAction(nameof(GetTaskById), new {id = response.Id}, response);
        }
        catch (Exception e)
        {
            return BadRequest(new { Message = e.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<HashSet<TaskItemResponse>>> GetAllTasks()
    {
        var items = await _service.GetAllAsync();
        return Ok(items);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskItemResponse>> UpdateTask(int id,[FromBody] TaskItemUpdateRequest item)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
           TaskItemResponse response = await _service.UpdateTask(id, item);
           if(response == null) return NotFound();
           
           return Ok(response);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(int id)
    {
        bool result = await _service.DeleteTask(id);
        
        return result ? Ok() : NotFound();
    }
    
}