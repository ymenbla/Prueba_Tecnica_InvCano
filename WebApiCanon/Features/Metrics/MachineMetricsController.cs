using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCanon.Features.Metrics.DTOs;

namespace WebApiCanon.Features.Metrics
{
    [Authorize]
    [ApiController]
    [Route("api/metrics")]
    public class MachineMetricsController : ControllerBase
    {
        private readonly IMachineMetricsService _machineMetricsService;

        public MachineMetricsController(IMachineMetricsService machineMetricsService)
        {
            _machineMetricsService = machineMetricsService;
        }

        [HttpGet("daily")]
        public async Task<ActionResult<MachineMetricsResponseDto>> GetDailyMetrics(
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

        [HttpGet("machines")]

        public async Task<ActionResult<MachineProductionResponseDto[]>> 
         GetMachinesWithProduction([FromQuery] DateOnly from, [FromQuery] DateOnly to)
        {
            if (from > to)
                return BadRequest("'from' no puede ser mayor que 'to'");

            var result = await _machineMetricsService.GetMechinesWithProductionAsync(from, to);

            return Ok(result);
        }
    }
}
