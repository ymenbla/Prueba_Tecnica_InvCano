
namespace WebApiCanon.Features.Machines.DTOs
{
    public class MachineResponseDto
    {
        public int MachineId { get; set; }
        public required string Name { get; set; }
        public required string Code { get; set; } 
        public bool IsActive { get; set; }
    }
}
