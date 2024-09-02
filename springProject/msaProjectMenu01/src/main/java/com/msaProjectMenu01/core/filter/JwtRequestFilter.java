package com.msaProjectMenu01.core.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Key;

public class JwtRequestFilter extends OncePerRequestFilter {

	@Value("${jwt.key}")
	private String SECRET_KEY;

	 private Key getSigningKey() {
	        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

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