
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using WebApiCanon.Features.Machines;

namespace WebApiCanon.Features.Productions
{
    public class DailyProduction
    {
        [Key]
        public int DailyProductionId { get; set; }
        public DateTime Date { get; set; }
        public int TargetUnits { get; set;}
        public int OkUnits { get; set;}
        public int DefectUnits { get; set; }
        public bool IsActive { get; set; } = true;

        public MachineItems? MachineItem { get; set; }
    }
}
