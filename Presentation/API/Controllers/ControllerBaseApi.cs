using BusinessLogic.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/[controller]")]
[ProducesResponseType(StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status403Forbidden)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[ProducesResponseType(StatusCodes.Status402PaymentRequired)]
[ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(BaseResult))]
public abstract class ControllerBaseApi : ControllerBase
{
}