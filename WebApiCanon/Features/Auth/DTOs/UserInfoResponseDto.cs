namespace WebApiCanon.Features.Auth.DTOs
{
    public class UserInfoResponseDto
    {
        public long Id { get; set; }
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
    }
}
