package com.example.auth;

import com.example.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserInfo {

    private String id;
    private String name;

    public UserInfo(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public static UserInfo fromUser(User user) {
        return new UserInfo(user.getUserId(), user.getName());
    }

}
