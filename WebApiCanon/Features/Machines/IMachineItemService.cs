using WebApiCanon.Features.Machines.DTOs;

namespace WebApiCanon.Features.Machines
{
    public interface IMachineItemService
    {
        // READ
        Task<IReadOnlyList<MachineResponseDto>> GetAllAsync();

        Task<MachineResponseDto> GetByIdAsync(int id);

        // CREATE
        Task<MachineResponseDto> CreateAsync(CreateMachineDto dto);

        // UPDATE
        Task<bool> UpdateAsync(int id, UpdateMachineDto dto);

        Task<bool> DisableMachineAsync(int id);

    }
}
