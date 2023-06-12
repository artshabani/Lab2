using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;

namespace YourProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpPost]
        public IActionResult SendEmail(EmailModel emailModel)
        {
            try
            {
                // Create the email message
                var emailMessage = new MimeMessage();
                emailMessage.From.Add(new MailboxAddress("Your Company", "yourcompany@example.com"));
                emailMessage.To.Add(new MailboxAddress("Recipient", emailModel.Email));
                emailMessage.Subject = emailModel.Subject;
                emailMessage.Body = new TextPart("plain")
                {
                    Text = emailModel.Message
                };

                // Configure the SMTP client
                using (var smtpClient = new SmtpClient())
                {
                    smtpClient.Connect("smtp.example.com", 587, false);
                    smtpClient.Authenticate("yourcompany@example.com", "your_password");

                    // Send the email
                    smtpClient.Send(emailMessage);
                    smtpClient.Disconnect(true);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during the email sending process
                return BadRequest(ex.Message);
            }
        }
    }

    public class EmailModel
    {
        public string Email { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}
