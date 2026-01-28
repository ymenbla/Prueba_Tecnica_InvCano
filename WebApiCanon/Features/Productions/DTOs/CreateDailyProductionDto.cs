namespace WebApiCanon.Features.Productions.DTOs
{
    public class CreateDailyProductionDto
    {
        public long MachineId { get; set; }

        public DateOnly Date { get; set; }

        public int TargetUnits { get; set; }
        public int OkUnits { get; set; }
        public int DefectUnits { get; set; }
    }
}
