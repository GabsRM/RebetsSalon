using System.Security.Cryptography;
using System.Text;
using BusinessLogic.Interfaces;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Logging;

namespace BusinessLogic.Service;

public class SecurityService : ISecurityService
{
    private readonly DateTime? SystemExpirationDate;
    private readonly ILogger<SecurityService> _logger;
    private readonly IDataProtector _dataProtector;

    public bool Activated
    {
        get =>
             SystemExpirationDate is null ? false : DateTime.Now < SystemExpirationDate;
    }

    public SecurityService(ILogger<SecurityService> logger, IDataProtectionProvider dataProtectionProvider)
    {
        _logger = logger;
        _dataProtector = dataProtectionProvider.CreateProtector("MinimalTools.Credentials");

        SystemExpirationDate = LoadCredentials();
    }


    private DateTime? LoadCredentials()
    {
        try
        {
            string credentialsPath = Path.Combine(Environment.CurrentDirectory, "MinimalTools.Credentials.dll");

            if (!File.Exists(credentialsPath))
                throw new Exception("Credenciales del sistema no encontradas");

            using StreamReader sr = new StreamReader(credentialsPath);

            string? line = sr.ReadLine();

            if (line is null)
                throw new Exception("Credenciales del sistema están vacías");

            var newDate = new DateTime(2030, 7, 9, 0, 0, 0);

            _logger.LogInformation(Encrypt(newDate.ToString()));

            var dateString = Decrypt(line);

            var date = DateTime.Parse(dateString);


            return date;
        }
        catch (Exception ex)
        {
            _logger.LogCritical(ex.Message, ex);
            return null;
        }
    }

    private string Encrypt(string text)
    {
        string hash = "adsjfoiqwejr2341";
        byte[] data = UTF8Encoding.UTF8.GetBytes(text);

        MD5 md5 = MD5.Create();
        TripleDES tripledes = TripleDES.Create();

        tripledes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
        tripledes.Mode = CipherMode.ECB;

        ICryptoTransform transform = tripledes.CreateEncryptor();
        byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

        return Convert.ToBase64String(result);
    }

    private string Decrypt(string text)
    {
        string hash = "adsjfoiqwejr2341";
        byte[] data = Convert.FromBase64String(text);

        MD5 md5 = MD5.Create();
        TripleDES tripledes = TripleDES.Create();

        tripledes.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
        tripledes.Mode = CipherMode.ECB;

        ICryptoTransform transform = tripledes.CreateDecryptor();
        byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

        return UTF8Encoding.UTF8.GetString(result);
    }
}