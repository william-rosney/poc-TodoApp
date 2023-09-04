using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddAppUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Todos",
                table: "Todos");

            migrationBuilder.RenameTable(
                name: "Todos",
                newName: "TodoTasks");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "TodoTasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TodoTasks",
                table: "TodoTasks",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AppUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUsers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TodoTasks_UserId",
                table: "TodoTasks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoTasks_AppUsers_UserId",
                table: "TodoTasks",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoTasks_AppUsers_UserId",
                table: "TodoTasks");

            migrationBuilder.DropTable(
                name: "AppUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TodoTasks",
                table: "TodoTasks");

            migrationBuilder.DropIndex(
                name: "IX_TodoTasks_UserId",
                table: "TodoTasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "TodoTasks");

            migrationBuilder.RenameTable(
                name: "TodoTasks",
                newName: "Todos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Todos",
                table: "Todos",
                column: "Id");
        }
    }
}
