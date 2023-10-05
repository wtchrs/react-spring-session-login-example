package com.example.endpoint;

import com.example.auth.UserInfo;
import com.example.dto.TestRequest;
import com.example.dto.TestResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/test")
public class TestApiController {

    @PostMapping
    public TestResponse test(HttpSession session, @RequestBody TestRequest testRequest) {
        log.info("TestApiController.test");
        UserInfo userInfo = (UserInfo) session.getAttribute("userInfo");
        if (userInfo == null) {
            return TestResponse.fail("Not logged in.");
        }
        if (testRequest.getMessage().isBlank()) {
            return TestResponse.fail("Empty content.");
        }
        return TestResponse.success(userInfo.getId() + ": " + testRequest.getMessage());
    }

}
