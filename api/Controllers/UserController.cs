namespace api.Controllers;

[Authorize]
public class UserController : BaseApiController
{
    #region  Constructor Section

    private readonly IUserRepository _userRepository;

    public UserController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    #endregion Constructor Section

    /// <summary>
    /// Get List<UserDto> 
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns>IEnumerable<UserDto></returns>
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll(CancellationToken cancellationToken)
    {
        List<UserDto> userDtos = await _userRepository.GettAllAsync(cancellationToken);

        if (!userDtos.Any()) // []
            return NoContent();

        return userDtos;
    }

    [HttpGet("get-by-id/{userId}")]
    public async Task<ActionResult<UserDto?>> GetByIdAsync(string userId, CancellationToken cancellationToken)
    {
        UserDto? userDto = await _userRepository.GetByIdAsync(userId, cancellationToken);

        if (userDto is null)
            return NotFound("No user was found");

        return userDto;
    }
}