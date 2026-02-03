using WebApiCanon.Features.Auth.DTOs;

namespace WebApiCanon.Features.Auth
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterRequestDto dto);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    }
}
