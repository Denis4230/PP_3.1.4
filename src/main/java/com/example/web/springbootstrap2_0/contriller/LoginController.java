package com.example.web.springbootstrap2_0.contriller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class LoginController {


    @GetMapping(value = "/login")
    public String getLoginPage() {
        return "login";
    }

    @GetMapping(value = "logout")
    public String getLogoutPage() {
        return "login";
    }

    @GetMapping(value = "error")
    public String getErrorPage() {
        return "error";
    }

    @GetMapping("/")
    public String getPage() {
        return "admin";
    }

}

