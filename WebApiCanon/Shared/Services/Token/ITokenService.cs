using WebApiCanon.Features.Users;

namespace WebApiCanon.Shared.Services.Token
{
    public interface ITokenService
    {
        string CreateAccessToken(User user);
        string GenerateRefreshToken();
    }
}
