using WebApiCanon.Features.Machines.DTOs;

namespace WebApiCanon.Features.Machines
{
    public interface IMachineItemService
    {
        // READ
        Task<IReadOnlyList<MachineResponseDto>> GetAllAsync();

        Task<MachineResponseDto> GetByIdAsync(long id);

        // CREATE
        Task<MachineResponseDto> CreateAsync(CreateMachineDto dto);

        // UPDATE
        Task<bool> UpdateAsync(long id, UpdateMachineDto dto);

        Task<bool> DisableMachineAsync(long id);

    }
}
