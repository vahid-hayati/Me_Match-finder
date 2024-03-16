namespace api.Interfaces;

public interface IAccountRepository
{
    public Task<LoggedInDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellayionToken);

    public Task<LoggedInDto?> LoginAsync(LoginDto userInput, CancellationToken cancellayionToken);
}
