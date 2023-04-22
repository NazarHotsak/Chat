using System.Text.RegularExpressions;

namespace Chat.Infrastructure
{
    public static class EmailHandler
    {
        public static bool IsValid(string email)
        {
            return Regex.IsMatch(email, @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
        }
    }
}
