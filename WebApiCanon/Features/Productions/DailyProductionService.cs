using Microsoft.EntityFrameworkCore;
using WebApiCanon.Data;
using WebApiCanon.Features.Productions.DTOs;

namespace WebApiCanon.Features.Productions
{
    public class DailyProductionService: IDailyProductionService
    {
        private readonly ApplicationDbContext _context;

        public DailyProductionService(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET
        public async Task<IEnumerable<DailyProductionResponseDto>> GetAsync(
            long machineId,
            DateOnly from,
            DateOnly to)
        {
            return await _context.DailyProductions
                .Where(dp =>
                    dp.IsActive &&
                    dp.MachineId == machineId &&
                    dp.Date >= from &&
                    dp.Date <= to)
                .OrderBy(dp => dp.Date)
                .Select(dp => new DailyProductionResponseDto
                {
                    DailyProductionId = dp.DailyProductionId,
                    MachineId = dp.MachineId,
                    Date = dp.Date,
                    TargetUnits = dp.TargetUnits,
                    OkUnits = dp.OkUnits,
                    DefectUnits = dp.DefectUnits,
                    IsActive = dp.IsActive
                })
                .ToListAsync();
        }

        // POST
        public async Task<DailyProductionResponseDto> CreateAsync(
            CreateDailyProductionDto dto)
        {
            var entity = new DailyProduction
            {
                MachineId = dto.MachineId,
                Date = dto.Date,
                TargetUnits = dto.TargetUnits,
                OkUnits = dto.OkUnits,
                DefectUnits = dto.DefectUnits,
                IsActive = true
            };

            _context.DailyProductions.Add(entity);
            await _context.SaveChangesAsync();

            return new DailyProductionResponseDto
            {
                DailyProductionId = entity.DailyProductionId,
                MachineId = entity.MachineId,
                Date = entity.Date,
                TargetUnits = entity.TargetUnits,
                OkUnits = entity.OkUnits,
                DefectUnits = entity.DefectUnits,
                IsActive = entity.IsActive
            };
        }

        // PUT disable
        public async Task<bool> DisableAsync(long dailyProductionId)
        {
            var entity = await _context.DailyProductions
                .FirstOrDefaultAsync(x =>
                    x.DailyProductionId == dailyProductionId &&
                    x.IsActive);

            if (entity == null)
                return false;

            entity.IsActive = false;
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
