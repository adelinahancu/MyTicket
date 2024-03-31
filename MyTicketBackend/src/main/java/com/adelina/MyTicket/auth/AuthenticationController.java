package com.adelina.MyTicket.auth;

import com.adelina.MyTicket.config.JwtService;
import com.adelina.MyTicket.dto.UserDto;
import com.adelina.MyTicket.repo.TokenRepo;
import com.adelina.MyTicket.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {
    private final AuthenticationService service;

    private final UserService userService;

    private final JwtService jwtService;

    private final TokenRepo tokenRepository;

    @PostMapping("register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){

        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request){
        ResponseEntity<?> checkCredentialsResponse = service.checkCredentials(request);
        if (checkCredentialsResponse.getStatusCode() != HttpStatus.OK) {
            return checkCredentialsResponse;
        }
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        service.refreshToken(request, response);
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserDto> getUserInfo(@Valid @RequestHeader(value = "Authorization") String token) {
        String jwt = token.substring(7);
        String username = jwtService.extractUsername(jwt);
        UserDto userDto = userService.getUser(username);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/logout")
    @Transactional
    public ResponseEntity<?> logoutUser(@Valid @RequestHeader(value = "Authorization") String token) {
        String jwt = token.substring(7);
        tokenRepository.deleteByToken(jwt);
        return ResponseEntity.ok(new MessageResponse("Logged out successfully."));
    }

    @PostMapping("/updateUser")
    public ResponseEntity<?> updateUserInfo(@Valid @RequestHeader(value = "Authorization") String token,
                                            @RequestBody UserDto userDto) {
        String jwt = token.substring(7);
        String username = jwtService.extractUsername(jwt);
        userService.updateUserInfo(username, userDto);
        return ResponseEntity.ok(new MessageResponse("User details updated successfully."));
    }

}
