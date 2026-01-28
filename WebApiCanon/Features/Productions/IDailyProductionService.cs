using WebApiCanon.Features.Productions.DTOs;

namespace WebApiCanon.Features.Productions
{
    public interface IDailyProductionService
    {
        Task<IEnumerable<DailyProductionResponseDto>> GetAsync(
            long machineId,
            DateOnly from,
            DateOnly to);

        Task<DailyProductionResponseDto> CreateAsync(CreateDailyProductionDto production);

        Task<bool> DisableAsync(long dailyProductionId);
    }
}
