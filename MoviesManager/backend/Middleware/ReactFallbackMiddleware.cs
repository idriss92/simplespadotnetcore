﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Middleware
{
    

    public class ReactFallbackMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private ReactFallbackOptions _options;

        public ReactFallbackMiddleware(RequestDelegate next, ILoggerFactory loggerFactory, ReactFallbackOptions options)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<ReactFallbackMiddleware>();
            _options = options;
        }

        public async Task Invoke(HttpContext context)
        {
            _logger.LogInformation("Handling request: " + context.Request.Path);

            // If request path starts with _apiPathPrefix and the path does not have an extension (i.e. .css, .js, .png)
            if (!context.Request.Path.Value.StartsWith(_options.ApiPathPrefix) && !context.Request.Path.Value.Contains("."))
            {
                _logger.LogInformation($"Rewriting path: {context.Request.Path} > {_options.RewritePath}");
                context.Request.Path = _options.RewritePath;
            }

            await _next.Invoke(context);
            _logger.LogInformation("Finished handling request.");
        }
    }

    public static class SpaFallbackExtensions
    {
        public static IApplicationBuilder UseSpaFallback(this IApplicationBuilder builder, ReactFallbackOptions options)
        {
            if (options == null)
            {
                options = new ReactFallbackOptions();
            }
            return builder.UseMiddleware<ReactFallbackMiddleware>(options);
        }
    }
}
