using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;
using System.Reflection.PortableExecutable;
using WebApiCanon.Features.Productions;

namespace WebApiCanon.Features.Machines
{
    public class MachineItems
    {

        [Key]
        public int MachineId { get; set; }
        public required string Code { get; set; } = string.Empty;
        public required string Name { get; set; } = string.Empty;
        public required bool IsActive { get; set; } = true;

        public ICollection<DailyProduction> DailyProductions { get; }
    }
}
