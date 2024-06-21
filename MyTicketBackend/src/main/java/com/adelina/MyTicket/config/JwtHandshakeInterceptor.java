package com.adelina.MyTicket.config;

import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class JwtHandshakeInterceptor implements HandshakeInterceptor {

    @Autowired
    private JwtService jwtService;
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String token = request.getHeaders().getFirst("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            // Token is missing or not in the correct format
            return false;
        }

        token = token.substring(7); // Remove "Bearer " prefix

        // Decode the token
        Claims claims = jwtService.extractAllClaims(token);
        if (claims == null) {
            // Token decoding failed
            return false;
        }



        // Perform expiration check
        if (jwtService.isTokenExpired(token)) {
            // Token has expired
            return false;
        }

        // Add authenticated flag to attributes
        attributes.put("authenticated", true);

        // Allow handshake to proceed
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
