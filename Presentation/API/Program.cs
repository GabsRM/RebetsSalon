using Api.Middleware;
using BusinessLogic.Helpers;
using DataAccess.Context;

using System.Data;
using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.MSSqlServer;
using Api.Utils;
using BusinessLogic.Service;
using BusinessLogic.Interfaces;

string CORS_KEY = "CorsPolicy";

var builder = WebApplication.CreateBuilder(args);

string appSettingsPath = Path.Combine(Environment.CurrentDirectory, "appsettings.json");

if (!File.Exists(appSettingsPath))
{
    Console.WriteLine("Application configuration file not found");
    Environment.Exit(-1);
}

var connectionStrings = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionStrings))
{
    Console.WriteLine("The database connection string has not been configured in the application settings.");
    Environment.Exit(-1);
}

var settings = new Settings();

builder.Configuration.GetSection("ApiSettings").Bind(settings);

if (!settings.IsValid())
{
    Console.WriteLine("Application settings file is invalid");
    Environment.Exit(-1);
}

builder.Services.AddDbContext<InwentContext>(options =>
{
    options.UseSqlServer(connectionStrings, builder =>
    {
        builder.EnableRetryOnFailure(5, TimeSpan.FromMinutes(10), null);
    });
});

builder.Services.AddDataProtection();

Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .WriteTo.MSSqlServer(connectionStrings,
                columnOptions: new()
                {
                    AdditionalColumns = new List<SqlColumn>
                    {
                        new ()
                        {
                            DataType = SqlDbType.VarChar,
                            ColumnName = "Username",
                        }
                    }
                },
                sinkOptions: new()
                {
                    TableName = "Logs",
                    AutoCreateSqlTable = true,
                },
                restrictedToMinimumLevel: LogEventLevel.Information
                )
            .CreateLogger();

builder.Logging.AddSerilog(Log.Logger);

builder.Services.AddHttpContextAccessor();

builder.Services.AddMemoryCache(options =>
{
    options.ExpirationScanFrequency = TimeSpan.FromMinutes(15);
});

builder.Services.AddSingleton<ISecurityService, SecurityService>();
builder.Services.AddSingleton<IHostedService, RoleManagementService>();
builder.Services.AddScoped<SessionService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<BranchService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<PurchaseService>();
builder.Services.AddScoped<SupplierService>();
builder.Services.AddScoped<InvoiceService>();

var identitySettingsSection = builder.Configuration.GetSection("ApiSettings");
builder.Services.Configure<Settings>(identitySettingsSection);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new()
    {
        ValidIssuer = settings.TokenSettings.IssuerToken,
        ValidAudience = settings.TokenSettings.AudienceToken,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.Unicode.GetBytes(settings.TokenSettings.SecretKey)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddCors(p => p.AddPolicy(CORS_KEY, builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

builder.Services.AddSwaggerGen(option =>
{

    OpenApiSecurityScheme scheme = new()
    {
        Description = "Ingrese el token de autenticación, ejemplo Bearer **Token**",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT"
    };

    option.AddSecurityDefinition("Bearer", scheme);

    option.AddSecurityRequirement(new()
    {
        {
            new()
            {
                Reference = new()
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseMiddleware<SecurityMiddleware>();
app.UseMiddleware<UnauthorizedMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(CORS_KEY);

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
