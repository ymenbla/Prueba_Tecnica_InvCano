using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiCanon.Features.Machines
{
    [Route("api/machines")]
    [ApiController]
    public class MachineItemController : ControllerBase
    {
        private readonly IMachineItemService _service;

        public MachineItemController(IMachineItemService service)
        {
            _service = service;
        }

        // GET: api/machines
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var machines = await _service.GetAllAsync();
            return Ok(machines);
        }

        // POST api/machines
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DTOs.CreateMachineDto dto)
        {
            var createdMachine = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = createdMachine.MachineId }, createdMachine);
        }

        // PUT api/machines/{machineId}/disable
        [HttpPut("{machineId}/disable")]
        public async Task<IActionResult> DisableMachine(int machineId)
        {
            await _service.DisableMachineAsync(machineId);
            return NoContent();

        }
    }
}
