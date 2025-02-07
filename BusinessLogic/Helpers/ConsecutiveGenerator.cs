
using DataAccess.Models;

namespace BusinessLogic.Helpers;

public static class ConsecutiveGenerator
{
    public static void GenerateConsecutive(Consecutive consecutive)
    {
        int i = 0;
        foreach (char character in consecutive.Mask)
            if (character.Equals('9'))
                break;
            else
                i++;

        var numsInMask = consecutive.Mask.Substring(i, consecutive.Length - i);

        if (!numsInMask.All(x => x.Equals('9')))
            throw new Exception("La máscara no corresponde a una máscara simple");

        var numsInConsecutive = consecutive.Consecutive1.Substring(i, consecutive.Length - i);
        var lettersInConsecutive = consecutive.Consecutive1.Substring(0, i);

        var consecutiveNum = int.Parse(numsInConsecutive) + 1;

        consecutive.Consecutive1 = $"{lettersInConsecutive}{consecutiveNum.ToString().PadLeft(numsInMask.Length, '0')}";
    }
}