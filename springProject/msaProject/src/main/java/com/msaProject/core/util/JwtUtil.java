package com.msaProject.core.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

public class JwtUtil {
	
    public static String generateToken(String username, String SECRET_KEY) {
        
    	// SECRET_KEY를 Base64로 디코딩하여 Key로 변환
        byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY); 
        Key signingKey = Keys.hmacShaKeyFor(keyBytes);
    	
    	return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10시간 유효
            .signWith(signingKey, SignatureAlgorithm.HS256)
            .compact();
    }
}
