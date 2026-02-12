using System.Security.Claims;
using WebApiCanon.Features.Auth.DTOs;

namespace WebApiCanon.Features.Auth
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterRequestDto dto);
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
        Task<UserInfoResponseDto?> GetCurrentUserAsync(ClaimsPrincipal userPrincipal);
    }
}
