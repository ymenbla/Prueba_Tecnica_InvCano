using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiCanon.Features.Productions.DTOs;

namespace WebApiCanon.Features.Productions
{
    [Authorize]
    [ApiController]
    [Route("api/daily-production")]
    public class DailyProductionController : ControllerBase
    {
        private readonly IDailyProductionService _service;

        public DailyProductionController(IDailyProductionService service)
        {
            _service = service;
        }

        // GET
        [HttpGet]
        public async Task<IActionResult> Get(
            [FromQuery] long machineId,
            [FromQuery] DateOnly from,
            [FromQuery] DateOnly to)
        {
            if (from > to)
                return BadRequest("The 'from' date cannot be greater than 'to' date.");

            var result = await _service.GetAsync(machineId, from, to);
            return Ok(result);
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> Create(
            [FromBody] CreateDailyProductionDto dto)
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(Get),
                new { machineId = created.MachineId },
                created);
        }

        // PUT disable
        [HttpPut("{dailyProductionId:long}/disable")]
        public async Task<IActionResult> Disable(long dailyProductionId)
        {
            var success = await _service.DisableAsync(dailyProductionId);

            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
