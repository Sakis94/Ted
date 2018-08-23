﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Ted.Model;
using Ted.Model.DTO;

namespace Ted.Bll.Interfaces
{
    public interface IUserService
    {
        Task<Result<UserInfoDTO>> GetUserInfo(string userId);
        Task<Result<UserInfoDTO>> UpdateUserInfo(string userId, UserInfoDTO userInfo);
        Task<Result<bool>> UpdatePassword(string userId, ChangePasswordDTO userInfo);
        Task<Result<byte[]>> GetPhoto(string userId);
        Task<Result<string>> InsertPhoto(string userId, byte[] PhotoByteArray);
    }
}
