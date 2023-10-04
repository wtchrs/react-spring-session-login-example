package com.example.endpoint;

import com.example.auth.UserAuthRequest;
import com.example.auth.UserAuthResponse;
import com.example.auth.UserInfo;
import com.example.entity.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/user/auth")
@RequiredArgsConstructor
public class UserAuthController {

    private final UserRepository userRepository;

    @GetMapping
    public UserAuthResponse currentUserInfo(HttpSession session) {
        log.info("UserAuthController.currentUserInfo");

        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        if (userInfo == null) {
            return UserAuthResponse.fail("Not logged in.");
        }
        return UserAuthResponse.success(userInfo);
    }

    @PostMapping
    public UserAuthResponse login(
            HttpServletRequest request, HttpSession session, @RequestBody UserAuthRequest authRequest) {

        log.info("UserAuthController.login");
        log.info("authRequest = {}", authRequest);

        UserAuthResponse response = userRepository
                .findById(authRequest.getId())
                .filter(user -> user.checkPassword(authRequest.getPassword()))
                .map(UserInfo::fromUser)
                .map(UserAuthResponse::success)
                .orElseGet(() -> UserAuthResponse.fail("Wrong ID or Password."));

        if (!response.isSuccess()) {
            return response;
        }

        if (!session.isNew()) {
            session.invalidate();
            session = request.getSession();
        }

        if (authRequest.isRemember()) {
            session.setMaxInactiveInterval(0);
        } else {
            session.setMaxInactiveInterval(10800);
        }

        session.setAttribute("userInfo", response.getUserInfo());
        return response;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        log.info("UserAuthController.logout");
        session.invalidate();
    }

}
