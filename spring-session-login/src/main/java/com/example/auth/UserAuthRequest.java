package com.example.auth;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserAuthRequest {

    private String id;

    private String password;

    private boolean remember;

    @Override
    public String toString() {
        return String.format(
                "com.example.auth.UserAuthRequest(id=%s, password=%s, remember=%b)", id, password, remember);
    }
}
