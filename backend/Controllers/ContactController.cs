using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace YourProject.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IMongoCollection<Contact> _contactsCollection;
        public ContactController(IConfiguration configuration)
        {
            _configuration = configuration;

            // Get the MongoDB connection string from the configuration
            var mongoConnectionString = _configuration.GetConnectionString("MongoDb");

            // Set up the MongoDB client
            var mongoClient = new MongoClient(mongoConnectionString);

            // Get the reference to the database and collection
            var database = mongoClient.GetDatabase("lab2");
            _contactsCollection = database.GetCollection<Contact>("Contacts");

        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] Contact contact)
        {
            try
            {
                // Validate the contact data (optional)
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                // Save the contact information to MongoDB
                _contactsCollection.InsertOne(contact);

                return Ok();
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during the saving process
                return StatusCode(500, ex.Message);
            }
        }

    }
}
