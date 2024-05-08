package com.adelina.MyTicket.service;

import com.adelina.MyTicket.model.User;
import com.adelina.MyTicket.model.UserDetailsImpl;
import com.adelina.MyTicket.repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepo userRepo;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user=userRepo.findByEmail(username)
                .orElseThrow(()->new UsernameNotFoundException("User not found exception"+username));

        return UserDetailsImpl.build(user);
    }
}
