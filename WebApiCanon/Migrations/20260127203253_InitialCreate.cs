using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApiCanon.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MachineItems",
                columns: table => new
                {
                    MachineId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MachineItems", x => x.MachineId);
                });

            migrationBuilder.CreateTable(
                name: "DailyProductions",
                columns: table => new
                {
                    DailyProductionId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MachineId = table.Column<long>(type: "bigint", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    TargetUnits = table.Column<int>(type: "int", nullable: false),
                    OkUnits = table.Column<int>(type: "int", nullable: false),
                    DefectUnits = table.Column<int>(type: "int", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailyProductions", x => x.DailyProductionId);
                    table.ForeignKey(
                        name: "FK_DailyProductions_MachineItems_MachineId",
                        column: x => x.MachineId,
                        principalTable: "MachineItems",
                        principalColumn: "MachineId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DailyProductions_MachineId",
                table: "DailyProductions",
                column: "MachineId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DailyProductions");

            migrationBuilder.DropTable(
                name: "MachineItems");
        }
    }
}
