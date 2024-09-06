package com.msaProject.board.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class JwtBlacklistService {

	@Autowired
    private StringRedisTemplate redisTemplate;
	
    private static final String BLACKLIST_PREFIX = "blacklistedToken:";

    // JWT 토큰을 블랙리스트에 추가
    public void addToBlacklist(String token, long expirationTime) {
    	Duration time = Duration.ofSeconds(expirationTime);
    	// long 타입으로 하면 /x00 이런식으로 바이트로 저장됨
    	redisTemplate.opsForValue().set(BLACKLIST_PREFIX + token, "true", time);
    }

    // 토큰이 블랙리스트에 있는지 확인
    public boolean isBlacklisted(String token) {
    	String value = redisTemplate.opsForValue().get(BLACKLIST_PREFIX + token);
        return "true".equals(value);
    }
}
