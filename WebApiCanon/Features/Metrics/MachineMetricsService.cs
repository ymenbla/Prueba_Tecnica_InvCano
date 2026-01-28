using Microsoft.EntityFrameworkCore;
using System;
using WebApiCanon.Data;
using WebApiCanon.Features.Metrics.DTOs;

namespace WebApiCanon.Features.Metrics
{
    public class MachineMetricsService: IMachineMetricsService
    {
        private readonly ApplicationDbContext _context;

        public MachineMetricsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MachineMetricsResponseDto> GetMetricsAsync(
            long machineId,
            DateOnly from,
            DateOnly to)
        {
            return await _context.DailyProductions
            .Where(x =>
                x.MachineId == machineId &&
                x.Date >= from &&
                x.Date <= to &&
                x.IsActive
            )
            .GroupBy(x => x.MachineId)
            .Select(g => new MachineMetricsResponseDto
            {
                TotalTarget = g.Sum(x => x.TargetUnits),
                TotalOk = g.Sum(x => x.OkUnits),
                TotalDefect = g.Sum(x => x.DefectUnits),
                TotalProduced =
                    g.Sum(x => x.OkUnits) + g.Sum(x => x.DefectUnits),

                Quality =
                    g.Sum(x => x.OkUnits) + g.Sum(x => x.DefectUnits) == 0
                        ? 0
                        : Math.Round(
                            (decimal)g.Sum(x => x.OkUnits) /
                            (g.Sum(x => x.OkUnits) + g.Sum(x => x.DefectUnits)),
                            4),

                Achievement =
                    g.Sum(x => x.TargetUnits) == 0
                        ? 0
                        : Math.Round(
                            Math.Min(
                                (decimal)g.Sum(x => x.OkUnits) /
                                g.Sum(x => x.TargetUnits),
                                1),
                            4),

                Score =
                    Math.Round(
                        (
                            (g.Sum(x => x.OkUnits) + g.Sum(x => x.DefectUnits) == 0
                                ? 0
                                : (decimal)g.Sum(x => x.OkUnits) /
                                  (g.Sum(x => x.OkUnits) + g.Sum(x => x.DefectUnits)))
                            *
                            (g.Sum(x => x.TargetUnits) == 0
                                ? 0
                                : Math.Min(
                                    (decimal)g.Sum(x => x.OkUnits) /
                                    g.Sum(x => x.TargetUnits),
                                    1))
                        ),
                        4)
            })
            .FirstOrDefaultAsync()
            ?? new MachineMetricsResponseDto();

        }
    }
}
