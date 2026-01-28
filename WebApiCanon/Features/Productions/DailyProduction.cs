
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApiCanon.Features.Machines;

namespace WebApiCanon.Features.Productions
{
    
    public class DailyProduction
    {
        [Key]
        public long DailyProductionId { get; set; } // BIGINT

        public long MachineId { get; set; } // FK

        [Column(TypeName = "date")]
        public DateOnly Date { get; set; } // MAPEO EXACTO A DATE

        public int TargetUnits { get; set; }
        public int OkUnits { get; set; }
        public int DefectUnits { get; set; }

        public bool IsActive { get; set; } = true;

        public MachineItems Machine { get; set; } = null!;
    }
}
