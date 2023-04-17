using backend;
using backend.Data;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text;
using Microsoft.AspNetCore.Identity;
using backend.Data;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.SwaggerGen;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbContext")));


builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMovieService, MovieService>();

var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]);

builder.Services.AddAuthentication(x =>
          {
              x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
              x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
          })
          .AddJwtBearer(x =>
          {
              x.RequireHttpsMetadata = false;
              x.SaveToken = true;

              x.TokenValidationParameters = new TokenValidationParameters

              {
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = new SymmetricSecurityKey(key),
                  ValidIssuers = new string[] { builder.Configuration["Jwt:Issuer"] },
                  ValidAudiences = new string[] { builder.Configuration["Jwt:Issuer"] },
                  ValidateIssuer = true,
                  ValidateAudience = true,
                  ValidateLifetime = true

              };

          });

//i want to get the user that registered
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" });
});


//FOR IDENTITY
//builder.Services.AddDefaultIdentity<ApplicationUser>()
// builder.Services.AddIdentity<IdentityUser, IdentityRole>()
//     .AddEntityFrameworkStores<AppDbContext>()
//     .AddDefaultTokenProviders();


builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();


app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Movies}/{action=Index}/{id?}");

Console.WriteLine("-------->Seeding data...");
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    DbSeed.Seed(context);
    Console.WriteLine("-------->Data seeded successfully.");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

app.Run();
