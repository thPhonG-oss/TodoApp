using AutoMapper;
using TaskApi.Dtos;
using TaskApi.Models;

namespace TaskApi.MappingProfiles;

public class GeneralMappingProfile : Profile
{
    public GeneralMappingProfile()
    {
        CreateMap<TaskItem, TaskItemResponse>();
        CreateMap<TaskItemResponse, TaskItem>();
    }
}