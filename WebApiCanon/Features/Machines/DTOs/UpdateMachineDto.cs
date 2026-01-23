namespace WebApiCanon.Features.Machines.DTOs
{
    public class UpdateMachineDto
    {
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }
}
