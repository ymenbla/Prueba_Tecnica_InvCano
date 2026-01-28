using WebApiCanon.Features.Metrics.DTOs;

namespace WebApiCanon.Features.Metrics
{
    public interface IMachineMetricsService
    {
        Task<MachineMetricsResponseDto> GetMetricsAsync(
        long machineId,
        DateOnly from,
        DateOnly to
    );
    }
}
