using Microsoft.AspNetCore.Mvc;

namespace WebApiCanon.Features.Metrics
{
    [Route("api/metrics")]
    [ApiController]
    public class MachineMetricsController : ControllerBase
    {
        private readonly IMachineMetricsService _machineMetricsService;

        public MachineMetricsController(IMachineMetricsService machineMetricsService)
        {
            _machineMetricsService = machineMetricsService;
        }

        [HttpGet("daily")]
        public async Task<IActionResult> GetDailyMetrics(
            [FromQuery] long machineId,
            [FromQuery] DateOnly from,
            [FromQuery] DateOnly to)
        {
            if (from > to)
                return BadRequest("'from' no puede ser mayor que 'to'");

            var result = await _machineMetricsService.GetMetricsAsync(
                machineId,
                from,
                to
            );

            return Ok(result);
        }
    }
}
