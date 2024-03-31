package com.adelina.MyTicket.service;

import com.adelina.MyTicket.dto.UserDto;
import com.adelina.MyTicket.model.User;
import com.adelina.MyTicket.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    public UserDto getUser(String email){
        User user = userRepo.findByEmail(email).orElseThrow();
        UserDto userDto = new UserDto();
        userDto.setFirstname(user.getFirstname());
        userDto.setLastname(user.getLastname());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole().toString());
        return userDto;
    }

    public void updateUserInfo(String email, UserDto userDto) {
        User user = userRepo.findByEmail(email).orElseThrow();
        user.setEmail(userDto.getEmail());
        user.setFirstname(userDto.getFirstname());
        user.setLastname(userDto.getLastname());
        userRepo.save(user);
    }
}
