namespace api.Extensions;

public static class RepositoryServiceExtensions
{
    public static IServiceCollection AddRepositoryServices(this IServiceCollection services)
    {
        #region Dependency Injections
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IAccountRepository, AccountRepository>(); // Controller LifeCycle
        services.AddScoped<IUserRepository, UserRepository>();
        #endregion Dependency Injections

        return services;
    }
}
        // builder.Services.AddSingleton<IAccountRepository, AccountRepository>(); App LifeCycle
