namespace api.Interfaces;

public interface IUserRepository
{
    public Task<List<UserDto>> GettAllAsync(CancellationToken cancellationToken);

    public Task<UserDto?> GetByIdAsync(string userId, CancellationToken cancellationToken);
}
