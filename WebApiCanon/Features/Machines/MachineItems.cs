using System.ComponentModel.DataAnnotations;
using WebApiCanon.Features.Productions;

namespace WebApiCanon.Features.Machines
{
    
    public class MachineItems
    {

        [Key]
        public long MachineId { get; set; } // BIGINT

        [Required]
        [MaxLength(50)]
        public string Code { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;

        public ICollection<DailyProduction> DailyProductions { get; set; }
            = new List<DailyProduction>();
    }
}
