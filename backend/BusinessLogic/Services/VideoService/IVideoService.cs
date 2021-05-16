﻿using System;
using System.IO;
using System.Threading.Tasks;
using DataAccess.Models;

namespace BusinessLogic.Services.VideoService
{
    public interface IVideoService
    {
        Task UploadChunk(Stream requestBody, Guid userId, string chunkNumber, string fileName);
        Task<Video> CompleteUpload(Guid userId, string fileName);
        Task DeleteVideo(Video video, Guid userId);
        void CreateUserVideoDirectory(Guid userId);
        void DeleteAllChunks(string fileName);
    }
}