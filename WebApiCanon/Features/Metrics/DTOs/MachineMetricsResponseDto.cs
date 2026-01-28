namespace WebApiCanon.Features.Metrics.DTOs
{
    public class MachineMetricsResponseDto
    {

        public int TotalTarget { get; set; }
        public int TotalOk { get; set; }
        public int TotalDefect { get; set; }
        public int TotalProduced { get; set; }

        public decimal Quality { get; set; }
        public decimal Achievement { get; set; }
        public decimal Score { get; set; }
    }
}
