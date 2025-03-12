using _401ScrumApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add SQLite Database Connection
builder.Services.AddDbContext<StalwartSaintsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("SaintsConnection")));

// Register Repository Pattern
builder.Services.AddScoped<iStalwartSaintsRepository, EFStalwartSaintsRepository>();

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactFrontend");
app.UseHttpsRedirection();  // Forces all HTTP requests to use HTTPS
app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

app.Run();
