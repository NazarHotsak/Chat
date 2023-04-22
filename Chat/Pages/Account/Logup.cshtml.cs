using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations;
using Chat.Infrastructure;

namespace Chat.Pages.Account
{
    public class Logup : PageModel
    {
        UserManager<IdentityUser> UserManager { get; set; }

        [EmailAddress]
        [BindProperty]
        public string Email { get; set; }

        [BindProperty]
        public string Username { get; set; }

        [BindProperty]
        public string Password { get; set; }

        [BindProperty]
        public string ComfirmedPassword { get; set; }

        public Logup(UserManager<IdentityUser> userManager)
        {
            UserManager = userManager;
        }

        public async Task<IActionResult> OnPostAsync()
        {
            bool isEmailValid = Email != null && EmailHandler.IsValid(Email);

            if (ComfirmedPassword != Password)
            {
                ModelState.AddModelError("", "Passwords are not the same");
            }
            else if (isEmailValid == false)
            {
                ModelState.AddModelError("", "Email is not valid");
            }
            else if (ModelState.IsValid)
            {
                IdentityUser user = new IdentityUser()
                {
                    Email = Email,
                    UserName = Username,
                };

                IdentityResult identityResult = await UserManager.CreateAsync(user, Password);

                if (identityResult.Succeeded)
                {
                    return Redirect("/");
                }

                foreach (var error in identityResult.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }
            }

            return Page();
        }
    }
}
