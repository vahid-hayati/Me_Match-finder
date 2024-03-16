namespace api.Repositories;

public class AccountRepository : IAccountRepository
{
    #region Constructor Section
    private const string _collectionName = "users";
    private readonly IMongoCollection<AppUser>? _collection;

    private readonly ITokenService _tokenService;

    public AccountRepository(IMongoClient client, IMongoDbSettings dbSettings, ITokenService tokenService)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<AppUser>(_collectionName);
        _tokenService = tokenService;
    }
    #endregion Constructor Section

    public async Task<LoggedInDto?> CreateAsync(RegisterDto userInput, CancellationToken cancellayionToken)
    {
        // check if user/email already exists
        bool doesAccountExist = await _collection.Find<AppUser>(user =>
           user.Email == userInput.Email.ToLower().Trim()).AnyAsync(cancellayionToken);

        if (doesAccountExist)
            return null;

        // manually dispose HMACSHA512 after being done
        using var hmac = new HMACSHA512();

        AppUser appUser = new   (
                Id: null,
                Email: userInput.Email.ToLower().Trim(),
                PasswordHash: hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.Password)),
                PasswordSalt: hmac.Key,
                KnownAs: userInput.KnownAs
            );

        if (_collection is not null)
            await _collection.InsertOneAsync(appUser, null, cancellayionToken);

        if (appUser.Id is not null)
        {
            return new LoggedInDto(
               Id: appUser.Id,
               Token: _tokenService.CreateToken(appUser),
               Email: appUser.Email,
               KnownAs: appUser.KnownAs
            );
        }

        return null;
    }

    public async Task<LoggedInDto?> LoginAsync(LoginDto userInput, CancellationToken cancellayionToken)
    {
        AppUser appUser = await _collection.Find<AppUser>(user =>
            user.Email == userInput.Email.ToLower().Trim()).FirstOrDefaultAsync(cancellayionToken);

        if (appUser is null)
            return null;

        // Import and use HMACSHA512 including PasswordSalt
        using var hmac = new HMACSHA512(appUser.PasswordSalt!);

        // Convert userInputPassword to Hash
        var ComputeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userInput.Password));

        // Check if password is correct and matched with Database PasswordHash.
        if (appUser.PasswordHash is not null && appUser.PasswordHash.SequenceEqual(ComputeHash))
        {
            if (appUser.Id is not null)
            {
                return new LoggedInDto(
                    Id: appUser.Id,
                    Token: _tokenService.CreateToken(appUser),  
                    Email: appUser.Email,
                    KnownAs: appUser.KnownAs
                );
            }
        }

        return null;
    }
}