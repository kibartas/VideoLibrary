﻿using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models
{
    public class Video
    {
        public Video()
        {
            UploadDate = DateTime.UtcNow;
            DeleteDate = null;
        }
        public Guid Id { get; set; }

        [Required]
        public string Title { get; set; }
        public long Size { get; set; }
        public string Path { get; set; }

        [Required]
        public DateTime UploadDate { get; set; }
        public DateTime? DeleteDate { get; set; }

        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
