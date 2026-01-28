namespace WebApiCanon.Features.Productions.DTOs
{
    public class DailyProductionResponseDto
    {
        public long DailyProductionId { get; set; }

        public long MachineId { get; set; }

        public DateOnly Date { get; set; }

        public int TargetUnits { get; set; }
        public int OkUnits { get; set; }
        public int DefectUnits { get; set; }

        public bool IsActive { get; set; }
    }
}
