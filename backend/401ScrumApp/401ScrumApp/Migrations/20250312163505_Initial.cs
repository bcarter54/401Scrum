using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace _401ScrumApp.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blessings",
                columns: table => new
                {
                    BlessingGroupID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BlessingGroup = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blessings", x => x.BlessingGroupID);
                });

            migrationBuilder.CreateTable(
                name: "StudyGroups",
                columns: table => new
                {
                    StudyGroupID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    GroupName = table.Column<string>(type: "TEXT", nullable: false),
                    Approved = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudyGroups", x => x.StudyGroupID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "Verses",
                columns: table => new
                {
                    VerseID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    VerseLocation = table.Column<string>(type: "TEXT", nullable: false),
                    Contents = table.Column<string>(type: "TEXT", nullable: false),
                    Invitation = table.Column<string>(type: "TEXT", nullable: false),
                    InvitationGroup = table.Column<string>(type: "TEXT", nullable: false),
                    Blessing = table.Column<string>(type: "TEXT", nullable: false),
                    BlessingGroupID = table.Column<int>(type: "INTEGER", nullable: false),
                    Approved = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Verses", x => x.VerseID);
                });

            migrationBuilder.CreateTable(
                name: "Videos",
                columns: table => new
                {
                    VideoID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    URL = table.Column<string>(type: "TEXT", nullable: false),
                    BlessingGroupID = table.Column<int>(type: "INTEGER", nullable: false),
                    Approved = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Videos", x => x.VideoID);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EventID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StudyGroupID = table.Column<int>(type: "INTEGER", nullable: false),
                    Topic = table.Column<string>(type: "TEXT", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Time = table.Column<TimeSpan>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EventID);
                    table.ForeignKey(
                        name: "FK_Events_StudyGroups_StudyGroupID",
                        column: x => x.StudyGroupID,
                        principalTable: "StudyGroups",
                        principalColumn: "StudyGroupID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    UserGroupID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    StudyGroupID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => x.UserGroupID);
                    table.ForeignKey(
                        name: "FK_UserGroups_StudyGroups_StudyGroupID",
                        column: x => x.StudyGroupID,
                        principalTable: "StudyGroups",
                        principalColumn: "StudyGroupID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroups_Users_Username",
                        column: x => x.Username,
                        principalTable: "Users",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    LikeID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    VerseID = table.Column<int>(type: "INTEGER", nullable: true),
                    VideoID = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => x.LikeID);
                    table.ForeignKey(
                        name: "FK_Likes_Users_Username",
                        column: x => x.Username,
                        principalTable: "Users",
                        principalColumn: "Username",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Verses_VerseID",
                        column: x => x.VerseID,
                        principalTable: "Verses",
                        principalColumn: "VerseID");
                    table.ForeignKey(
                        name: "FK_Likes_Videos_VideoID",
                        column: x => x.VideoID,
                        principalTable: "Videos",
                        principalColumn: "VideoID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_StudyGroupID",
                table: "Events",
                column: "StudyGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_Username",
                table: "Likes",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_VerseID",
                table: "Likes",
                column: "VerseID");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_VideoID",
                table: "Likes",
                column: "VideoID");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_StudyGroupID",
                table: "UserGroups",
                column: "StudyGroupID");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_Username",
                table: "UserGroups",
                column: "Username");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blessings");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "Verses");

            migrationBuilder.DropTable(
                name: "Videos");

            migrationBuilder.DropTable(
                name: "StudyGroups");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
