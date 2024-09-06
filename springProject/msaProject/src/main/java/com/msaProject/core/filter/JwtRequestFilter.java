package com.msaProject.core.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.Key;
import java.util.Base64;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);

    @Value("${jwt.key}")
    private String SECRET_KEY;

    // 제외할 URL 목록
    private final List<String> excludeUrlPatterns = List.of("/api/login", "/api/create", "/api/logout");

    private Key getSigningKey() {
    	byte[] keyBytes = Base64.getDecoder().decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes); // Key 객체 생성
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        // 현재 요청 URI
        String requestUri = request.getRequestURI();

        // 제외할 경로에 해당하는 경우 필터를 건너뜁니다.
        if (excludeUrlPatterns.contains(requestUri)) {
            chain.doFilter(request, response);
            return;
        }

        logger.info("Request received at {}", request.getRemoteAddr());

        // 쿠키에서 JWT 추출
        String jwt = extractJwtFromCookies(request);

        if (jwt != null) {
            try {
                String userId = extractUsername(jwt);
                if (userId != null && request.getAttribute("userId") == null) {
                    // JWT가 유효하면 사용자 정보를 설정
                    request.setAttribute("userId", userId);
                } else if (userId == null) {
                	response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 존재하지 않습니다.");
                    return;
                }
            } catch (Exception e) {
                // JWT가 유효하지 않은 경우
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰이 만료되었거나 존재하지 않습니다.");
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
        //return (String) claims.get("userId");	// claims map 방식으로도 가능
    }
}
