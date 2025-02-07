using System.ComponentModel.DataAnnotations;

namespace Api.Utils;

public class FromRouteRequired : RequiredAttribute
{
    public FromRouteRequired(string message)
    {
        ErrorMessage = message;
    }
}