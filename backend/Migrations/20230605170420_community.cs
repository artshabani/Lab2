using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class community : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "CommunityId",
                table: "Comment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Community",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Topic = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Community", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_CommunityId",
                table: "Comment",
                column: "CommunityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comment_Community_CommunityId",
                table: "Comment",
                column: "CommunityId",
                principalTable: "Community",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comment_Community_CommunityId",
                table: "Comment");

            migrationBuilder.DropTable(
                name: "Community");

            migrationBuilder.DropIndex(
                name: "IX_Comment_CommunityId",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "CommunityId",
                table: "Comment");
        }
    }
}
