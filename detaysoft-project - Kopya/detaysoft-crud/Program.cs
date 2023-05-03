using detaysoft_crud.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

builder.Services.AddCors();


//Add-Migration initial hatasý aldýðýmýz için ekledik: 1.si
builder.Services.AddDbContext<EmployeeContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("CRUDCS")));

//Add-Migration initial hatasý aldýðýmýz için ekledik: 2.si
//AppContext.UseCors(builder =>
//
//    builder
//    .AllowAnyOrigin()
//    .AllowAnyMethod()
//    .AllowAnyHeader();
//});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
