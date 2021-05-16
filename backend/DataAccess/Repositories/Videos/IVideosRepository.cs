﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DataAccess.Models;

namespace DataAccess.Repositories.Videos
{
    public interface IVideosRepository
    {
        Task<Video> GetVideoById(Guid videoId);
        Task<IEnumerable<Video>> GetAllVideos();
        Task InsertVideo(Video video);
        void RemoveVideo(Video video);
        Task Save();
    }
}