namespace Clinic.Models
{
    public class Message
    {
        public string Title { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }

        public Message(string title, string header, string content)
        {
            Title = title;
            Header = header;
            Content = content;
        }
    }
}