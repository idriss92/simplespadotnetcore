using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using backend.Context;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
          .SetBasePath(Directory.GetCurrentDirectory())
          .AddJsonFile("appsettings.json")
          .Build();

            var host = BuildWebHost(config["serverBindingUrl"], args);
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<MoviesContext>();
                    DbInitializer.Initialize(context);
                }
                catch (Exception exception)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(exception, "Error while initialize the database");
                }
            }
            //using (var scope = host.Services.CreateScope())
            //{
            //    var dbInitializer = scope.ServiceProvider.GetRequiredService<Context.IDefaultDbContextInitializer>();
            //    var env = scope.ServiceProvider.GetRequiredService<IHostingEnvironment>();
            //    // Apply any pending migrations
            //    dbInitializer.Migrate();
            //    if (env.IsDevelopment())
            //    {
            //        // Seed the database in development mode
            //        dbInitializer.Seed().GetAwaiter().GetResult();
            //    }
            //}

            host.Run();
        }

        public static IWebHost BuildWebHost(string serverBindingUrl,string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            .UseContentRoot(Directory.GetCurrentDirectory())
            .UseUrls(serverBindingUrl)
                .UseStartup<Startup>()
                .Build();
    }
}
