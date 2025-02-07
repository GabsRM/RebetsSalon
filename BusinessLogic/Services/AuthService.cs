using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Caching.Memory;

using DataAccess.Context;
using BusinessLogic.Models;
using BusinessLogic.Helpers;

namespace BusinessLogic.Service;

public class AuthService : BaseService<UserDto, UserDataInputDto>
{
    private readonly Token _token;
    private readonly ILogger<AuthService> _logger;
    private readonly IMemoryCache _memory;
    private readonly SessionService _session;

    public AuthService(IOptions<Settings> settings, InwentContext dbContext, ILogger<AuthService> logger, IMemoryCache memory, SessionService session) : base(dbContext)
    {
        _token = settings.Value.TokenSettings;
        _logger = logger;
        _memory = memory;
        _session = session;
    }

    public async Task<BaseResult> UpdatePassword(string username, string password, string newPassword)
    {
        try
        {
            var user = _dbContext.User.Where(x => x.Username.ToUpper().Equals(username.ToUpper())).FirstOrDefault();

            if (user is null)
                return new(Message.Error.USER_NOT_FOUND);

            var passwordHasher = new PasswordHasher<string>();

            if (passwordHasher.VerifyHashedPassword(username, user.Password, password) != PasswordVerificationResult.Success)
                return new(Message.Error.PASSWORD_INVALID);

            user.Password = passwordHasher.HashPassword(username, newPassword);

            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.USER_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<Result<LoginDto>> Authenticate(string username, string password)
    {
        try
        {
            var user = _dbContext.User.Include(x => x.Role).Include(x => x.DefaultBranchNavigation).AsSingleQuery().Where(x => x.Username.ToUpper().Equals(username.ToUpper())).FirstOrDefault();

            if (user is null)
                return new(Message.Error.USERNAME_PASSWORD_INVALID);

            var passwordHasher = new PasswordHasher<string>();

            if (passwordHasher.VerifyHashedPassword(username, user.Password, password) != PasswordVerificationResult.Success)
                return new(Message.Error.USERNAME_PASSWORD_INVALID);

            user.LastLogin = DateTime.Now;

            var token = GenerateToken(username, user.DefaultBranch ?? "", user.Role.Select(x => x.IdRole).ToList());

            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new()
            {
                Data = new()
                {
                    Token = token,
                    User = {
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Username = user.Username,
                        DefaultBranch = user.DefaultBranchNavigation is not null ? new UserBranchDto(user.DefaultBranchNavigation.BranchId, user.DefaultBranchNavigation.Name, user.DefaultBranchNavigation.Address, user.DefaultBranchNavigation.Phone) : null,
                        Roles = user.Role.Where(x => x.Active).Select(x => new UserRoleDto(x.IdRole, x.Description))
                    }
                },
                Message = Message.Success.USER_AUTHENTICATED
            };
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<Result<LoginDto>> RefreshSession()
    {
        try
        {
            var user = _dbContext.User.Include(x => x.Role).Include(x => x.DefaultBranchNavigation).AsSingleQuery().Where(x => x.Username.Equals(_session.Username)).FirstOrDefault();

            if (user is null)
                return new(Message.Error.USERNAME_PASSWORD_INVALID);

            var token = GenerateToken(user.Username, user.DefaultBranch ?? "", user.Role.Select(x => x.IdRole).ToList());

            _dbContext.Entry(user).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return new()
            {
                Data = new()
                {
                    Token = token,
                    User = {
                        Firstname = user.Firstname,
                        Lastname = user.Lastname,
                        Username = user.Username,
                        DefaultBranch = user.DefaultBranchNavigation is not null ? new UserBranchDto(user.DefaultBranchNavigation.BranchId, user.DefaultBranchNavigation.Name, user.DefaultBranchNavigation.Address, user.DefaultBranchNavigation.Phone) : null,
                        Roles = user.Role.Where(x => x.Active).Select(x => new UserRoleDto(x.IdRole, x.Description))
                    }
                },
                Message = Message.Success.USER_AUTHENTICATED
            };
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Create(UserDataInputDto model)
    {
        try
        {
            if (model is null)
                return new(Message.Error.USER_DATA_EMPTY);

            if (string.IsNullOrEmpty(model.Password))
                return new(Message.Error.PASSWORD_EMPTY);

            var user = await _dbContext.User.FindAsync(model.Username);

            if (user != null)
                return new(Message.Error.USER_EXIST);

            var passwordHasher = new PasswordHasher<string>();

            user = new()
            {
                Active = true,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Username = model.Username,
                Password = passwordHasher.HashPassword(model.Username, model.Password)
            };

            await _dbContext.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            return new(Message.Success.USER_CREATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<List<UserDto>>> Get()
    {
        try
        {
            var users = await (from u in _dbContext.User.Include(x => x.Role).Include(x => x.DefaultBranchNavigation).AsSplitQuery()
                               where u.Active
                               let b = u.DefaultBranchNavigation
                               select new UserDto()
                               {
                                   Username = u.Username,
                                   Firstname = u.Firstname,
                                   Lastname = u.Lastname,
                                   DefaultBranch = b != null ? new UserBranchDto(b.BranchId, b.Name, b.Address, b.Phone) : null,
                                   Roles = u.Role.Where(x => x.Active).Select(x => new UserRoleDto(x.IdRole, x.Description))

                               }).ToListAsync();

            return new(users);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<Result<UserDto>> Get(string username)
    {
        try
        {
            var user = await _dbContext.User.Include(x => x.Role).Include(x => x.DefaultBranchNavigation).AsSingleQuery().FirstOrDefaultAsync(x => x.Username.Equals(username));

            if (user is null)
                return new(Message.Error.DOCUMENT_NOT_FOUND);

            if (!user.Active)
                return new(Message.Error.USER_INACTIVATE);

            return new(new()
            {
                Firstname = user.Firstname,
                Lastname = user.Lastname,
                Username = user.Username,
                DefaultBranch = user.DefaultBranchNavigation is not null ? new UserBranchDto(user.DefaultBranchNavigation.BranchId, user.DefaultBranchNavigation.Name, user.DefaultBranchNavigation.Address, user.DefaultBranchNavigation.Phone) : null,
                Roles = user.Role.Where(x => x.Active).Select(x => new UserRoleDto(x.IdRole, x.Description))
            }, Message.Success.DATA_SUCCESSFULLY_OBTAINED);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Delete(string id)
    {
        try
        {
            var user = await _dbContext.User.FirstOrDefaultAsync(x => x.Username == id);

            if (user is null)
                return new(Message.Error.USER_NOT_FOUND);

            user.Active = false;

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.USER_INACTIVATE_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public override async Task<BaseResult> Update(string id, UserDataInputDto model)
    {
        try
        {
            var user = await _dbContext.User.Include(x => x.Role).FirstOrDefaultAsync(x => x.Username == id);

            if (user is null)
                return new(Message.Error.USER_NOT_FOUND);


            user.Firstname = model.Firstname;
            user.Lastname = model.Lastname;

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.USER_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }
    }

    public async Task<BaseResult> UpdateSecurityData(string id, UserSecurityInputDto model)
    {
        try
        {
            var user = await _dbContext.User.Include(x => x.Role).FirstOrDefaultAsync(x => x.Username == id);

            if (user is null)
                return new(Message.Error.USER_NOT_FOUND);

            var roles = await _dbContext.Role.Where(x => model.Roles.Contains(x.IdRole)).ToListAsync();

            user.DefaultBranch = model.DefaultBranch;
            user.Role = roles;

            _dbContext.Entry(user).State = EntityState.Modified;

            await _dbContext.SaveChangesAsync();

            return new(Message.Success.USER_UPDATED_SUCCESSFULLY, true);
        }
        catch (Exception ex)
        {
            return new(ex);
        }

    }

    private string GenerateToken(string username, string branchId, IEnumerable<string> roles)
    {
        var issuer = _token.IssuerToken;
        var audience = _token.AudienceToken;
        var key = _token.SecretKey;
        var expireTime = _token.ExpireTime;

        var bytesKey = Encoding.Unicode.GetBytes(key);

        SymmetricSecurityKey securityKey = new(bytesKey);
        SigningCredentials signinCredentials = new(securityKey, SecurityAlgorithms.HmacSha256Signature);

        Claim nameIdentifier = new(ClaimTypes.NameIdentifier, username);
        Claim locality = new(ClaimTypes.Locality, branchId);
        Claim role = new(ClaimTypes.Role, string.Join(',', roles));

        ClaimsIdentity claimsIdentity = new(new[] { nameIdentifier, locality, role });

        JwtSecurityTokenHandler tokenHandler = new();

        var jwtSecurityToken = tokenHandler.CreateJwtSecurityToken(
            _token.IssuerToken,
            _token.AudienceToken,
            claimsIdentity,
            DateTime.UtcNow,
            DateTime.UtcNow.AddMinutes(expireTime),
            DateTime.UtcNow,
            signinCredentials
        );

        return tokenHandler.WriteToken(jwtSecurityToken);
    }
}