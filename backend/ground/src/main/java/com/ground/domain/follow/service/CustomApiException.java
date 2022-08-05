package com.ground.domain.follow.service;

import java.util.Map;

public class CustomApiException extends RuntimeException{

    public CustomApiException(String message) {
        super(message);
    }
}