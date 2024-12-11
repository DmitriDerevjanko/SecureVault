using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    [Table("password")]
    public class Password
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }

        [Column("login")]
        public string? Login { get; set; }

        [Column("password")]
        public string? PasswordValue { get; set; }

        [Column("purpose")]
        public string? Purpose { get; set; }

        [ForeignKey("User")]
        public string? UserId { get; set; }

        [Column("folder_name")]
        public string? FolderName { get; set; }
    }
}
