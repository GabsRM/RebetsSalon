using Microsoft.AspNetCore.Http;

namespace BusinessLogic.Helpers;

public class BaseResult
{
    public bool Success = true;

    public string Message { get; set; } = string.Empty;

    public Exception? Exception;

    public BaseResult() { }

    public BaseResult(Exception exception)
    {
        Message = Helpers.Message.Error.INTERNAL_SERVER_ERROR;
        Exception = exception;
    }

    public BaseResult(string message, bool success = false)
    {
        Success = success;
        Message = message;
    }
}