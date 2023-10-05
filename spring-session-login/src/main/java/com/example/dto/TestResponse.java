package com.example.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TestResponse {

    private boolean success;

    private String message;

    private String errorMsg;

    private TestResponse(boolean success, String message, String errorMsg) {
        this.success = success;
        this.message = message;
        this.errorMsg = errorMsg;
    }

    public static TestResponse success(String message) {
        return new TestResponse(true, message, null);
    }

    public static TestResponse fail(String errorMsg) {
        return new TestResponse(false, null, errorMsg);
    }

}
