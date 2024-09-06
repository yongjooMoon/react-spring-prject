package com.msaProjectMenu01.core.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.msaProjectMenu01.core.filter.JwtRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;
import java.util.Base64;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter .class);
	
	@Value("${jwt.key}")
	private String SECRET_KEY;

	private Key getSigningKey() {
		byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
	    return Keys.hmacShaKeyFor(keyBytes); // Key 객체 생성
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

    	logger.info("Request received at {}", request.getRemoteAddr());
    	
        // 쿠키에서 JWT 추출
        String jwt = extractJwtFromCookies(request);

        if (jwt != null) {
            try {
                String username = extractUsername(jwt);
                if (username != null && request.getAttribute("username") == null) {
                    // JWT가 유효하면 사용자 정보를 설정
                    request.setAttribute("username", username);
                }
            } catch (Exception e) {
                // JWT가 유효하지 않은 경우
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                return;
            }
        }

        chain.doFilter(request, response);
        
        logger.info("Response sent to {}", request.getRemoteAddr());
    }

    private String extractJwtFromCookies(HttpServletRequest request) {
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

    private String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}
