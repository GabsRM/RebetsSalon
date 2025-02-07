using BusinessLogic.Helpers;
using DataAccess.Context;
using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace BusinessLogic.Service;

public class RoleManagementService : IHostedService
{
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private readonly ILogger<RoleManagementService> _logger;
    private readonly List<Role> defaultRoles = new()
    {
        new()
        {
            IdRole = ApiRole.Administrator,
            Description = "Administrador del Sistema",
            Active = true,
        },
        new()
        {
            IdRole = ApiRole.Seller,
            Description = "Vendedor",
            Active = true,
        },
        new()
        {
            IdRole = ApiRole.InventoryManager,
            Description = "Administrador de Inventario",
            Active = true,
        }
    };

    public RoleManagementService(IServiceScopeFactory serviceScopeFactory, ILogger<RoleManagementService> logger)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _logger = logger;
    }

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        try
        {
            // Se agregan los roles
            await Parallel.ForEachAsync(defaultRoles, async (role, ct) =>
            {
                using var dbContext = _serviceScopeFactory.CreateAsyncScope().ServiceProvider.GetRequiredService<InwentContext>();

                var exist = dbContext.Role.Select(x => x.IdRole).Contains(role.IdRole);

                if (exist)
                    return;

                await dbContext.AddAsync(role);
                await dbContext.SaveChangesAsync();
            });

            using var dbContext = _serviceScopeFactory.CreateAsyncScope().ServiceProvider.GetRequiredService<InwentContext>();
            var existAdminUser = dbContext.User.Select(x => x.Username).Contains("Admin");

            if (!existAdminUser)
            {
                var roles = await dbContext.Role.Where(x => x.Active).ToListAsync();

                var passwordHasher = new PasswordHasher<string>();

                var admin = new User()
                {
                    Username = "Admin",
                    Firstname = "Administrador",
                    Lastname = "del Sistema",
                    Active = true,
                    Role = roles
                };

                admin.Password = passwordHasher.HashPassword(admin.Username, "1234");

                await dbContext.AddAsync(admin);
                await dbContext.SaveChangesAsync();
            }

            _logger.LogInformation("Se ha agregado el usuario administrador a la base de datos");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al inicializar el usuario y rol administrador");
        }
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}