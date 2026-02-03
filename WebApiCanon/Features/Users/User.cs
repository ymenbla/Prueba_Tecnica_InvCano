using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApiCanon.Features.Users
{
    [Table("Users")]
    public class User
    {
        [Key]
        public long Id { get; set; }
        
        [Required]
        [MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(150)]
        public required string Email { get; set; } = string.Empty;

        [Required]
        public required string PasswordHash { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
        
        // Refresh Token
        public string? RefreshTokenHash { get; set; }
        public DateTime? RefreshTokenExpiresAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
