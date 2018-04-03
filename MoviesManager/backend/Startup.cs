using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Context;
using backend.Middleware;
using backend.Repositories;
using backend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace backend
{
    public class Startup
    {
        public IHostingEnvironment CurrentEnvironment { get; protected set; }
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IMoviesRepository, MoviesRepository>();
            services.AddScoped<IActorsRepository, ActorsRepository>();
            services.AddScoped<IRealisatorsRepository, RealisatorRepository>();
            services.AddScoped<IMoviesService, MoviesService>();
            services.AddDbContext<MoviesContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc();
            //services.AddEntityFrameworkNpgsql().AddDbContext<MoviesContext>(options =>
            //{
            //    options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            //});

            //// Configure Entity Framework Initializer for seeding
            //services.AddTransient<IDefaultDbContextInitializer, DefaultDbContextInitializer>();


            //services.AddScoped<IMoviesRepository, MoviesRepository>();
            //services.AddScoped<IMoviesService, MoviesService>();
            //services.AddDbContext<MoviesContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));


            //services.AddScoped<IMoviesRepository, MoviesRepository>();
            //services.AddScoped<IMoviesService, MoviesService>();

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

            });

            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true,
                    HotModuleReplacementClientOptions = new Dictionary<string, string> { { "reload", "true" } },
                    ReactHotModuleReplacement = true,
                    ConfigFile = System.IO.Path.Combine(Configuration["webClientPath"], "webpack.config.js")
                });

                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }

            // If not requesting /api*, rewrite to / so SPA app will be returned
            app.UseSpaFallback(new ReactFallbackOptions()
            {
                ApiPathPrefix = "/api",
                RewritePath = "/"
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                // Read and use headers coming from reverse proxy: X-Forwarded-For X-Forwarded-Proto
                // This is particularly important so that HttpContet.Request.Scheme will be correct behind a SSL terminating proxy
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto
            });

            app.UseMvc();
            app.UseCors(options => options.AllowAnyHeader());
        }
    }
}
