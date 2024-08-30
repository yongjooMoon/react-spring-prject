package com.msaProject.core.filter;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

@Component
public class LoggingFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(LoggingFilter .class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        logger.info("Request received at {}", request.getRemoteAddr());
        
        Map<String, String[]> map = request.getParameterMap();
        // 파라미터 맵을 순회하면서 로그 출력
        for (Map.Entry<String, String[]> entry : map.entrySet()) {
            String key = entry.getKey();
            String[] values = entry.getValue();
            
            // 값 배열을 문자열로 변환
            String valuesString = String.join(", ", values);

            // 로그 출력
            logger.info("Parameter Name: {}, Values: {}", key, valuesString);
        }

        chain.doFilter(request, response);

        logger.info("Response sent to {}", request.getRemoteAddr());
    }
}