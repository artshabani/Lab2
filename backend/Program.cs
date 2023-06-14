using backend;
using backend.Data;
using backend.Services;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using backend.Models;
using System.IdentityModel.Tokens.Jwt;
using Data;
using backend.SignalR;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DbContext");
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder => builder
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .WithExposedHeaders("WWW-Authenticate")
    .WithOrigins("http://localhost:3000"));
});
builder.Services.AddIdentityCore<AppUser>(o =>
{
    o.Password.RequireNonAlphanumeric = false;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<AppDbContext>()
.AddSignInManager<SignInManager<AppUser>>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IMovieService, MovieService>();

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt"]));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
          .AddJwtBearer(x =>
          {
              x.TokenValidationParameters = new TokenValidationParameters
              {
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = key,
                  ValidateIssuer = false,
                  ValidateAudience = false
              };
              x.Events = new JwtBearerEvents
              {
                  OnMessageReceived = context =>
                  {
                      var accessToken = context.Request.Query["access_token"];
                      var path = context.HttpContext.Request.Path;
                      if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/room")))
                      {
                          context.Token = accessToken;
                      }
                      if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/topic")))
                      {
                          context.Token = accessToken;
                      }
                      return Task.CompletedTask;
                  }
              };
          }
);

//i want to get the user that registered
builder.Services.AddHttpContextAccessor();
builder.Services.AddSignalR();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<RoomHub>("/room");

app.MapHub<CommunityHub>("/topic");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Movies}/{action=Index}/{id?}");

Console.WriteLine("-------->Seeding data...");
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<AppDbContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    await Seed.SeedAdminAsync(userManager, roleManager, context);

    DbSeed.Seed(context);
    Console.WriteLine("-------->Data seeded successfully.");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

app.Run();
