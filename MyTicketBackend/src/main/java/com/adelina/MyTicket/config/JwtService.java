package com.adelina.MyTicket.config;

import com.adelina.MyTicket.model.User;
import com.adelina.MyTicket.repo.UserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("60000000000000000")
    private long jwtExpiration;
    @Value("60480000000000000")
    private long refreshExpiration;

    private final UserRepo userRepo;
    private static final String SECRET_KEY="fbc260e8fa91afcfa6d24ad95c0d43b0ca4b8b20093a8135a12aa8fa2bc05447";
    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);

    }
    public<T> T extractClaim(String token, Function<Claims,T> claimsResolver){
    final Claims claims=extractAllClaims(token);
    return claimsResolver.apply(claims);
    }


    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ) {
        return generateToken(extraClaims, userDetails, jwtExpiration);
    }
    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(),userDetails,refreshExpiration);
    }

    public String generateToken(Map<String,Object> extraClaims, UserDetails userDetails,long expiration){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username=extractUsername(token);
        return(username.equals(userDetails.getUsername()))&& !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {

        return extractClaim(token,Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}
