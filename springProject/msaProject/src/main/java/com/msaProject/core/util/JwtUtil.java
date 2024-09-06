package com.msaProject.core.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {
	
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
}
