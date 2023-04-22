using Chat.Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.SignalR;

namespace Chat.Pages
{
    [Authorize]
    public class IndexModel : PageModel
    {
        private IHubContext<ChatHub> _hubContext;

        public IndexModel(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public void OnGet()
        {
        }

        public async Task OnPostSend(string message)
        {
            string username = User.Identity?.Name ?? "";
            await _hubContext.Clients.All.SendAsync("Receive", message, username);
            /*return RedirectToPage();*/
        }

        public IActionResult OnGetSendMes(string message)
        {
            return RedirectToPage();
        }
    }
}
