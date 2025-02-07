namespace BusinessLogic.Helpers;

public class Result<T> : BaseResult
{
    public T? Data { get; set; }

    public Result() { }

    public Result(T data, string message = Helpers.Message.Success.SUCCESS)
    {
        Data = data;
        Message = message;
    }

    public Result(Exception exception) : base(exception) { }

    public Result(string message, bool success = false) : base(message, success) { }
}