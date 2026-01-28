using Microsoft.EntityFrameworkCore;
using WebApiCanon.Data;
using WebApiCanon.Features.Machines.DTOs;

namespace WebApiCanon.Features.Machines
{
    public class MachineItemService : IMachineItemService
    {
        private readonly ApplicationDbContext _context;
        public MachineItemService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<MachineResponseDto> CreateAsync(CreateMachineDto dto)
        {
            var machine = new MachineItems
            {
                Name = dto.Name,
                Code = dto.Code,
                IsActive = dto.IsActive,
            };

            _context.MachineItems.Add(machine);
            await _context.SaveChangesAsync();

            return new MachineResponseDto
            {
                MachineId = machine.MachineId,
                Name = machine.Name,
                Code = machine.Code,
                IsActive = machine.IsActive,
            };
        }

        public async Task<IReadOnlyList<MachineResponseDto>> GetAllAsync()
        {
            return await _context.MachineItems
                .AsNoTracking()
                .Select(machine => new MachineResponseDto
                {
                    MachineId = machine.MachineId,
                    Name = machine.Name,
                    Code = machine.Code,
                    IsActive = machine.IsActive,
                })
                .ToListAsync();
        }
        public async Task<MachineResponseDto?> GetByIdAsync(long id)
        {
            return await _context.MachineItems
                .AsNoTracking()
                .Where(u => u.MachineId == id)
                .Select(machine => new MachineResponseDto
                {
                    MachineId = machine.MachineId,
                    Name = machine.Name,
                    Code = machine.Code,
                    IsActive = machine.IsActive,
                })
                .FirstOrDefaultAsync();
        }
        public async Task<bool> UpdateAsync(long id, UpdateMachineDto dto)
        {
            var machine = await _context.MachineItems.FindAsync(id);

            if (machine is null)
                return false;

            machine.Name = dto.Name;
            machine.Code = dto.Code;
            machine.IsActive = dto.IsActive;


            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DisableMachineAsync(long id)
        {
            var machine = await _context.MachineItems.FindAsync(id);
            if (machine is null)
                return false;
            machine.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
