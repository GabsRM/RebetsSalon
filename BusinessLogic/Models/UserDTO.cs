
namespace BusinessLogic.Models;

public record UserRoleDto(string roleId, string description);

public record UserDataInputDto(string Username, string? Password, string Firstname, string Lastname);

public record UserSecurityInputDto(string Username, string? DefaultBranch, List<string> Roles);

public record UserPasswordInputDto(string Password, string NewPassword);

public record UserBranchDto (string BranchId, string Name, string? Address, string? Phone);

public class UserDto
{
    public string Username { get; set; } = null!;

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public UserBranchDto? DefaultBranch { get; set; } = null!;

    public IEnumerable<UserRoleDto> Roles { get; set; } = null!;

    public UserDto() { }
}
