﻿using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.EntityConfigurations
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<User>
    {
        private List<User> Users;
        public UserEntityConfiguration(List<User> users)
        {
            Users = users;
        }
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(c => c.Id);
            builder.Property(c => c.Firstname).HasMaxLength(20).IsRequired();
            builder.Property(c => c.Lastname).HasMaxLength(20).IsRequired();
            builder.Property(c => c.Email).HasMaxLength(30).IsRequired();
            builder.Property(c => c.Password).HasMaxLength(20).IsRequired();
            builder.Property(c => c.Confirmed).IsRequired();

            builder.HasMany(c => c.Videos)
                .WithOne(c => c.User)
                .HasForeignKey(c => c.UserId);
        }
    }
}
