using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WebApiCanon.Data;
using WebApiCanon.Features.Auth.DTOs;
using WebApiCanon.Features.Users;
using WebApiCanon.Shared.Services.Token;

namespace WebApiCanon.Features.Auth
{
    public class AuthService: IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;

        public AuthService(
            ApplicationDbContext context,
            ITokenService tokenService,
            IConfiguration config)
        {
            _context = context;
            _tokenService = tokenService;
            _config = config;
        }

        public async Task<UserInfoResponseDto?> GetCurrentUserAsync(ClaimsPrincipal userPrincipal)
        {
            var nameIdentifier = userPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            
            if (string.IsNullOrEmpty(nameIdentifier))
                return null;
            
            long.TryParse(nameIdentifier, out var userId);

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return null;

            return new UserInfoResponseDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email
            };
        }

        public async Task RegisterAsync(RegisterRequestDto dto)
        {
            if (await _context.Users.AnyAsync(x => x.Email == dto.Email))
                throw new Exception("Email already registered");

            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email && x.IsActive);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials");

            return await GenerateTokensAsync(user);
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            // 1️. Separar token
            var parts = refreshToken.Split('.');
            if (parts.Length != 2)
                throw new UnauthorizedAccessException("Invalid refresh token");

            if (!long.TryParse(parts[0], out var userId))
                throw new UnauthorizedAccessException("Invalid token");
            var rawToken = parts[1];

            // 2️. Buscar SOLO el usuario correcto
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Id == userId &&
                u.RefreshTokenExpiresAt > DateTime.UtcNow);

            if (user == null || user.RefreshTokenHash == null)
                throw new UnauthorizedAccessException("Invalid refresh token");

            // 3️. Verificar hash en memoria
            if (!BCrypt.Net.BCrypt.Verify(rawToken, user.RefreshTokenHash))
                throw new UnauthorizedAccessException("Invalid refresh token");

            // 4️. Rotación del refresh token
            return await GenerateTokensAsync(user);
        }

        private async Task<AuthResponseDto> GenerateTokensAsync(User user)
        {
            var accessToken = _tokenService.CreateAccessToken(user);
            var rawRefreshToken = _tokenService.GenerateRefreshToken();
            var refreshToken = $"{user.Id}.{rawRefreshToken}";

            user.RefreshTokenHash = BCrypt.Net.BCrypt.HashPassword(rawRefreshToken);
            user.RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(
                int.Parse(_config["Jwt:RefreshTokenDurationInDays"]!));

            await _context.SaveChangesAsync();

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(
                    int.Parse(_config["Jwt:DurationInMinutes"]!)),
                RefreshTokenExpiresAt = user.RefreshTokenExpiresAt.Value
            };
        }
    }
}
