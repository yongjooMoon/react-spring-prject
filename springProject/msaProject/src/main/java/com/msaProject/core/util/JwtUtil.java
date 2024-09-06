package com.msaProject.core.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
	
	private static String SECRET_KEY;

    @Autowired
    public void setEnvironment(Environment environment) {
        SECRET_KEY = environment.getProperty("jwt.key");
    }
    
    private static Key getSigningKey() {
    	byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes); // Key 객체 생성
    }
	
	// 토큰 생성
    public static String generateToken(String userId, String SECRET_KEY) {
    	// SECRET_KEY를 Base64로 디코딩하여 Key로 변환
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY); 
        Key signingKey = Keys.hmacShaKeyFor(keyBytes);
    	
        Map<String, String> map = new HashMap<>();	// map 방식으로도 가능
        map.put("userId", userId);
        
    	return Jwts.builder()
    		.setClaims(map)
            .setSubject(userId)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10시간 유효
            .signWith(signingKey, SignatureAlgorithm.HS256)
            .compact();
    }
    
    // 키 생성
    public static void createKey() {
    	var key = Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256);
    	System.out.println("secret key : " + key.getEncoded());
    }
    
    // JWT에서 만료 시간 가져오기
    public static long getExpiration(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration().getTime();
    }
    
    private static Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 토큰 유효성 검증
    public static boolean validateToken(String token) {
        return !isTokenExpired(token);
    }

    private static boolean isTokenExpired(String token) {
        return getExpiration(token) < System.currentTimeMillis();
    }
    
	public static String extractJwtFromCookies(HttpServletRequest request) {
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

	
	public static String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
        //return (String) claims.get("userId");	// claims map 방식으로도 가능
    }
}
