namespace TaskApi.Dtos;

public class TaskItemResponse
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; }
    public DateTime LastModifiedOn { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; } = "Todo";
}