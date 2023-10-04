package com.example.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAuthResponse {

    private boolean success;

    private UserInfo userInfo;

    private String errorMsg;

    private UserAuthResponse(boolean success, UserInfo userInfo, String errorMsg) {
        this.success = success;
        this.userInfo = userInfo;
        this.errorMsg = errorMsg;
    }

    public static UserAuthResponse success(UserInfo userInfo) {
        return new UserAuthResponse(true, userInfo, null);
    }

    public static UserAuthResponse fail(String errorMsg) {
        return new UserAuthResponse(false, null, errorMsg);
    }

}
